import { EndPoint } from '../tool/end-point';
import { StatusCodes } from '../tool/api';

import { Totem } from '../models/totem';
import { Venta } from "../models/venta";

export const corrGet = new EndPoint()
corrGet.method = 'get'
corrGet.path = '/corr/get/:ip'
corrGet.callback = async (req, res) => {
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
    
        const data = await Venta.find({
            take: 3,
            where: {
                totem: totem
            },
            order: {
                id: 'ASC'
            }
        })

        res.api.send(data)
    } catch (err) {
        res.api.catch(err)
    }
}