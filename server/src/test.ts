import barcode from './tool/barcode';
import { Log } from './tool/log';

export function test() {
    Log.ev('Testear Barcode:')
    Log.ln('Input  = 100005')
    Log.ln('Output = ' + barcode.to128('100005'))
}