import { EndPoint } from '../tool/end-point';
import { StatusCodes } from '../tool/api';

import { TipoAte } from '../models/tipo-ate';
import { Cliente } from '../models/cliente';
import { Venta } from '../models/venta';
import { Totem } from '../models/totem';

export const corrNext = new EndPoint()
corrNext.method = 'get'
corrNext.path = '/corr/next/:rut?'
corrNext.callback = async (req, res) => {
    let tipo: TipoAte
    let rut: string = req.params.rut
    if (rut === undefined) {
        rut = '100005'
    } else {
        rut = rut.replace(/[^0-9k]/gi, '')
    }

    // Buscar cliente
    let cli = await Cliente.findOne({ 
        where: {
            rut: rut
        }
    })
    if (cli == null) {
        res.api.failed({ 
            HttpResponse: StatusCodes.cod500,
            details: "El usuario especificado no existe."
        })
        return
    }

    // Buscar Tipo
    let diff = (Date.now() - cli.fechaNac.getTime()) / 1000 / 60 / 60 / 24 / 365.6
    if ((cli.rut != '100005') && (diff > 60)) {
        tipo = await TipoAte.findOne({ cod: 'A' })
    } else {
        tipo = await TipoAte.findOne({ cod: 'B' })
    }

    
    // Buscar Tótem
    let totem = await Totem.findOne({ ip: req.ip })
    if (totem == null) {
        res.api.failed({ 
            HttpResponse: StatusCodes.cod403,
            details: "Necesita de estar conectado desde un Tótem para acceder a esta funcionalidad."
        })
        return
    }

    // Comprobar si estamos en el mismo día
    let now = new Date()
    totem.currFecha = new Date()
    if (
        (totem.currFecha.getFullYear() == now.getFullYear()) &&
        (totem.currFecha.getMonth() == now.getMonth()) &&
        (totem.currFecha.getDate() == now.getDate())
    ) {
        totem.currCorr++
        await totem.save()
    } else {
        totem.currCorr = 1
        await totem.save()
    }
    
    // Crear nueva respuesta
    let venta = new Venta()
    venta.tipoAte = tipo
    venta.cliente = cli
    venta.totem = totem
    venta.correlat = totem.currCorr
    venta.fecha = now
    venta.save()

    res.api.send(venta)
}