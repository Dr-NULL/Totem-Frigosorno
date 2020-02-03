import moment from 'moment';
import { EndPoint } from '../tool/end-point';
import { StatusCodes } from '../tool/api';
import { makeVoucher } from '../tool/voucher';
import { IO } from '../app/.';

import { TipoAte } from '../models/tipo-ate';
import { Cliente } from '../models/cliente';
import { Venta } from '../models/venta';
import { Totem } from '../models/totem';

export const CORRELATIVO_NEXT = new EndPoint()
CORRELATIVO_NEXT.method = 'get'
CORRELATIVO_NEXT.path = '/correlativo/next/:rut?'
CORRELATIVO_NEXT.callback = async (req, res) => {
    try {
        // Buscar Tótem
        let totem = await Totem.findOne({ ip: req.ip })
        if (totem == null) {
            res.api.failed({ 
                httpResponse: StatusCodes.cod403,
                details: "Necesita de estar conectado desde un Tótem para acceder a esta funcionalidad."
            })
            return
        }

        // Crear nueva Venta
        const venta = new Venta()
        const loadDefault = async (typedRut: string) => {
            // Cargar datos por defecto
            venta.typedRut = typedRut
            venta.tipoAte = await TipoAte.findOne({ cod: 'B' })
            venta.cliente = await Cliente.findOne({
                rut: '100005'
            })
        }

        let rut: string = req.params.rut
        if (rut != null) {
            // Buscar cliente por RUT
            rut = rut.replace(/[^0-9k]/gi, '')
            venta.cliente = await Cliente.findOne({
                rut: rut.replace(/[^0-9k]/gi, '')
            })

            if (venta.cliente != null) {
                venta.typedRut = rut
                
                // Calcular edad
                const diff = moment(new Date())
                    .diff(
                        venta.cliente.fechaNac,
                        'years'
                    )

                // Asignar tipo de usuario según edad
                if (diff >= 65) {
                    venta.tipoAte = await TipoAte.findOne({ cod: 'A' })
                } else {
                    venta.tipoAte = await TipoAte.findOne({ cod: 'B' })
                }
            } else {
                loadDefault(rut)
            }
        } else {
            loadDefault(rut)
        }

        // Setear Totem
        if (
            moment(new Date()).format('YYYY/MM/DD') !=
            moment(totem.currFecha).format('YYYY/MM/DD')
        ) {
            totem.currCorrelat = 1
        } else {
            totem.currCorrelat++
        }
        totem.currFecha = new Date()
        await totem.save()

        // Crear Venta
        venta.correlat = totem.currCorrelat
        venta.fecha = totem.currFecha
        venta.totem = totem
        await venta.save()

        // Generar Voucher
        await makeVoucher(venta, totem)
        IO.to(totem.ip).emit('correlativo-update')
        res.api.send(venta)
    } catch (err) {
        res.api.catch(err)
    }
}