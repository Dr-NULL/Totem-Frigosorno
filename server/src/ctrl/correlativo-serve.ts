import { StatusCodes } from '../tool/api';
import { EndPoint } from '../tool/end-point';

import { TipoAte } from '../models/tipo-ate';
import { Totem } from '../models/totem';
import { Venta } from '../models/venta';
import { IO } from '../app';

export const CORRELATIVO_SERVE = new EndPoint()
CORRELATIVO_SERVE.method = 'get'
CORRELATIVO_SERVE.path = '/correlativo/serve/:ip'
CORRELATIVO_SERVE.callback = async (req, res) => {
    try {
        // Buscar el Totem al que hace referencia
        const totem = await Totem.findOne({ ip: req.params.ip.trim() })
        if (totem == null) {
            res.api.failed({
                httpResponse: StatusCodes.cod404,
                details: 'No se ha encontrado tótem alguno con esa IP. '
                    + 'Repita la búsqueda con una IP ya registrada.'
            })
            return
        }

        
        // Buscar posición actual para atender
        const tipo = await TipoAte.findOne({ cod: 'A' })
        const current = await Venta.findOne({
            where: {
                totem: totem,
                isServed: false
            },
            order: {
                tipoAte: 'ASC',
                id: 'ASC'
            }
        })

        // Cambiar estado
        if (current != null) {
            current.isServed = true
            await current.save()
        }

        // Emitir evento de actualización
        IO.to(totem.ip).emit('correlativo-update')
        res.api.send()
    } catch (err) {
        res.api.catch(err)
    }
}