import { Cliente } from '../models/cliente';
import { Log } from '../tool/log';

export async function loadCliente() {
    Log.ev('Cliente <- Loading...')
    
    let cliente = new Cliente()
    cliente.rut = '100005'
    cliente.nombres = "Cliente"
    cliente.apellidoP = "Prueba"
    cliente.apellidoM = "Local"
    cliente.telefono = 912345678
    cliente.fechaNac = new Date(1994, 0, 1)
    await cliente.save()
    
    cliente = new Cliente()
    cliente.rut = '185793389'
    cliente.nombres = "Felipe Andrés"
    cliente.apellidoP = "Silva"
    cliente.apellidoM = "Aguilar"
    cliente.telefono = 981745986
    cliente.fechaNac = new Date(1994, 4, 6)
    await cliente.save()
    
    cliente = new Cliente()
    cliente.rut = '138211916'
    cliente.nombres = "Robinson Alejandro"
    cliente.apellidoP = "Godoy"
    cliente.apellidoM = "Saldivia"
    cliente.telefono = 912345678
    cliente.fechaNac = new Date(1978, 11, 23)
    await cliente.save()
    
    cliente = new Cliente()
    cliente.rut = '191816390'
    cliente.nombres = "Byron Sebastián"
    cliente.apellidoP = "Pradines"
    cliente.apellidoM = "Pradines"
    cliente.telefono = 912346468
    cliente.fechaNac = new Date(1995, 11, 11)
    await cliente.save()
    
    Log.ok('Cliente <- Complete!')
}