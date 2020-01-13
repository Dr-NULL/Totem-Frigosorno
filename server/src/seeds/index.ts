import { loadTipoAte } from './load-tipo-ate';
import { loadTotem } from './load-totem';
import { loadCliente } from './load-cliente';

import { createConnection } from 'typeorm';
import { Log } from '../tool/log';

export async function loadSeeds() {
    try {
        Log.ev('conectando a DB...')

        let conn = await createConnection()
        
        Log.ok('Conexión exitosa!\n')
        Log.ev('Iniciando carga de datos:')
        Log.ln('↓↓↓    ↓↓↓    ↓↓↓')
        
        await loadTipoAte()
        await loadTotem()
        await loadCliente()

        Log.ln('↑↑↑    ↑↑↑    ↑↑↑')
        Log.ok('Carga completada!')
    } catch (err) {
        Log.er('Error en la carga de datos!')
        Log.ln(err.message)
    } finally {
        process.exit()
    }
}