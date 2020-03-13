import { EndPoint } from '../tool/end-point';
import { StatusCodes } from '../tool/api';

import { Totem } from '../models/totem';
import { Venta } from "../models/venta";

export const CORRELAT_GET = new EndPoint()
CORRELAT_GET.method = 'get'
CORRELAT_GET.path = '/correlat/get/:ip'
CORRELAT_GET.callback = async (req, res) => {
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

        let cant = (totem.isStandby) ? 2 : 3
        const data = await Venta.find({
            take: cant,
            where: {
                totem: totem,
                isServed: false
            },
            order: {
                tipoAte: 'ASC',
                id: 'ASC'
            }
        })

        if (data.length == 0) {
          totem.isStandby = true
          await totem.save()
        }
        if (totem.isStandby) {
          data.unshift(null)
        }
        while (data.length - 3) {
          data.push(null)
        }

        res.api.send(data)
    } catch (err) {
        res.api.catch(err)
    }
}