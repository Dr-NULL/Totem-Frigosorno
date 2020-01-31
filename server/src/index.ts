import { read } from './tool/app-param';
import { setup } from './tool/app-config';

import { startServer } from './app/.';
import { loadSeeds } from './seeds/.';
import { test } from './test';

export const CONFIG = setup()
console.clear()
switch(read()[0]) {
    case 'test':
        test()
        break
    case 'seeds':
        loadSeeds()
        break
    default:
        startServer()
        break
}