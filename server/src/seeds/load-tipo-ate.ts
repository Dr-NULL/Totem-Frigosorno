import { TipoAte } from '../models/tipo-ate';
import { Log } from '../tool/log';

export async function loadTipoAte() {
    Log.ev('TipoAte <- Loading...')

    let tipoA: TipoAte = new TipoAte()
    tipoA.cod = 'A'
    tipoA.descripc = 'Mayores de 60 años'
    await tipoA.save()

    let tipoB: TipoAte = new TipoAte()
    tipoB.cod = 'B'
    tipoB.descripc = 'Usuario normal'
    await tipoB.save()

    Log.ok('TipoAte <- Complete!')
}