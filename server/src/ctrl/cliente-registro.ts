import { EndPoint } from '../tool/end-point';
import { Cliente } from '../models/cliente';

export const clienteRegistro = new EndPoint();
clienteRegistro.method = 'post'
clienteRegistro.path = '/cliente/registro'
clienteRegistro.callback = async(req, res) => {
    try {
        let data: Cliente = req.body
        let cli = new Cliente()
        cli.rut = data.rut
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