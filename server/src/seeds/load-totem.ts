import { Totem } from '../models/totem';
import { Log } from '../tool/log';

export async function loadTotem() {
    Log.ev('Totem <- Loading...')

    let test = new Totem()
    test.ip = '127.0.0.1'
    test.descripc = 'Tótem para pruebas locales en desarrollo'
    await test.save()

    Log.ok('Totem <- Complete!')
}