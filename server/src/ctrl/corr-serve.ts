import { StatusCodes } from '../tool/api';
import { EndPoint } from '../tool/end-point';

import { Totem } from '../models/totem';
import { Venta } from '../models/venta';
import { io } from '../app/.';

export const corrServe = new EndPoint()
corrServe.method = 'get'
corrServe.path = '/corr/serve'
corrServe.callback = async (req, res) => {
    try {
        // Buscar Los primeros 3 correlativos sin atender
        const totem = await Totem.findOne({ ip: req.params.ip.trim() })
        if (totem == null) {
            res.api.failed({
                httpResponse: StatusCodes.cod404,
                details: 'No se ha encontrado tótem alguno con esa IP. '
                    + 'Repita la búsqueda con una IP ya registrada.'
            })
            return
        }

    } catch (err) {
        res.api.catch(err)
    }
}