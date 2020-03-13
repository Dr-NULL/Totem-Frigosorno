import { Totem } from '../models/totem';
import { Cliente } from '../models/cliente';
import { EndPoint } from '../tool/end-point';
import { StatusCodes } from '../tool/api';

export const CLIENTE_ACTUALIZAR = new EndPoint()
CLIENTE_ACTUALIZAR.method = 'post'
CLIENTE_ACTUALIZAR.path = '/cliente/actualizar'
CLIENTE_ACTUALIZAR.callback = async (req, res) => {
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
        
        // Buscar cliente
        const body: Cliente = req.body
        const cli = await Cliente.findOne({ id: body.id })
        if (cli == null) {
            res.api.failed({
                httpResponse: StatusCodes.cod404,
                details: 'El cliente especificado no existe'
            })
            return
        } else {
            cli.nombres = body.nombres
            cli.apellidoP = body.apellidoP
            cli.apellidoM = body.apellidoM
            cli.fechaNac = body.fechaNac
            cli.telefono = body.telefono
            cli.email = body.email
            await cli.save()

            res.api.send()
        }
    } catch (err) {
        res.api.catch(err)
    }
}