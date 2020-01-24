import { Totem } from '../models/totem';
import { Log } from '../tool/log';

export async function loadTotem() {
    try {
        Log.ev('Totem <- Loading...')
    
        let test = new Totem()
        test.ip = '127.0.0.1'
        test.descripc = 'PC para pruebas locales en desarrollo'
        test.printerName = 'printerTotem_Z_Development'
        await test.save()
    
        test = new Totem()
        test.ip = '192.168.20.249'
        test.descripc = 'PC para pruebas remotas en desarrollo'
        test.printerName = 'printerTotem_Z_Development'
        await test.save()
    
        test = new Totem()
        test.ip = '192.168.20.86'
        test.descripc = 'Tótem para pruebas remotas en desarrollo'
        test.printerName = 'printerTotem_Z_Development'
        await test.save()
    
        Log.ok('Totem <- Complete!')
    } catch (err) {
        Log.ln()
        Log.er("Carga de Semillas Fallido:")
        Log.ln(err.message)
    }
}