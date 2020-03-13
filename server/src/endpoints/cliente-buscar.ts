import { Totem } from '../models/totem';
import { Cliente } from '../models/cliente';
import { EndPoint } from '../tool/end-point';
import { StatusCodes } from '../tool/api';

export const CLIENTE_BUSCAR = new EndPoint()
CLIENTE_BUSCAR.method = 'get'
CLIENTE_BUSCAR.path = '/cliente/buscar/:rut?'
CLIENTE_BUSCAR.callback = async (req, res) => {
    try {
        // Comprobar Tótem
        const dev = await Totem.findOne({ ip: req.ip })
        if (dev == null) {
            res.api.failed({
                httpResponse: StatusCodes.cod403,
                details: 'No tiene autorización para acceder a esta funcionalidad.'
            })
            return
        }

        // Comprobar Parámetro
        if (req.params.rut == null) {
            res.api.failed({
                httpResponse: StatusCodes.cod400,
                details: 'Debe de especificar un RUT dentro de la URL de búsqueda. '
                + `Ej: /api/cliente/buscar/1-9`
            })
            return
        }
        
        // Buscar cliente
        const rut = req.params.rut.replace(/[^0-9k]/gi, '')
        const cli = await Cliente.findOne({ rut: rut.trim() })
        if (cli == null) {
            res.api.failed({
                httpResponse: StatusCodes.cod404,
                details: 'El RUT especificado no existe'
            })
            return
        } else {
            res.api.send(cli)
        }
    } catch (err) {
        res.api.catch(err)
    }
}