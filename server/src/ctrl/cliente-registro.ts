import { EndPoint } from '../tool/end-point';
import { Cliente } from '../models/cliente';
import { StatusCodes } from '../tool/api';
import '../tool/capitalize';

export const CLIENTE_REGISTRO = new EndPoint();
CLIENTE_REGISTRO.method = 'post'
CLIENTE_REGISTRO.path = '/cliente/registro'
CLIENTE_REGISTRO.callback = async(req, res) => {
    try {
        let data: Cliente = req.body
        let cli = await Cliente.findOne({ rut: data.rut.replace(/[^0-9k]/gi, '') })
        if (cli != null) {
        res.api.failed({
            httpResponse: StatusCodes.cod500,
            details: 'El RUT ingresado ya existe, por favor reintente con un RUT válido.'
        })
            return 
        } else {
            cli = new Cliente()
        }
        
        cli.rut = data.rut.replace(/[^0-9k]/gi, '')
        cli.nombres = data.nombres.trim().capitalize()
        cli.apellidoP = data.apellidoP.trim().capitalize()

        if (data.apellidoM != null) {
            cli.apellidoM = data.apellidoM.trim().capitalize()
        }

        cli.fechaNac = data.fechaNac
        cli.telefono = data.telefono.trim()
        cli.email = data.email.trim().toLowerCase()
        await cli.save()

        res.api.send()
    } catch(err) {
        res.api.catch(err)
    }
}