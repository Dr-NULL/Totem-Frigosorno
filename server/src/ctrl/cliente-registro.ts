import { EndPoint } from '../tool/end-point';
import { Cliente } from '../models/cliente';
import { StatusCodes } from '../tool/api';

export const clienteRegistro = new EndPoint();
clienteRegistro.method = 'post'
clienteRegistro.path = '/cliente/registro'
clienteRegistro.callback = async(req, res) => {
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
        cli.nombres = data.nombres
        cli.apellidoP = data.apellidoP
        cli.apellidoM = data.apellidoM
        cli.fechaNac = data.fechaNac
        cli.telefono = data.telefono
        cli.email = data.email
        await cli.save()

        res.api.send()
    } catch(err) {
        res.api.catch(err)
    }
}