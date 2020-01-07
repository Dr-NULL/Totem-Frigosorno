import { Cliente } from '../models/cliente';
import { Log } from '../tool/log';

export async function loadClientes() {
    Log.ev('Cliente <- Loading...')
    
    let cliente = new Cliente()
    cliente.rut = '100005'
    cliente.nombres = "Cliente"
    cliente.apellidoP = "Prueba"
    cliente.apellidoM = "Local"
    cliente.telefono = 912345678
    cliente.fechaNac = new Date(1994, 0, 1)
    await cliente.save()
    
    Log.ok('Cliente <- Complete!')
}