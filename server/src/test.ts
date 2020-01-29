import { Log } from './tool/log';
import './tool/capitalize'

export function test() {
    Log.ev('Testear Capitalize:')
    
    Log.ok(
        'hola malditos, los wa a matar a todos lol'
        .capitalize()
    )
    Log.ok(
        `   jajajasd dale'nsdlfk relax@nksdjfnl`
        .capitalize()
    )
}