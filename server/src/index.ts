import { read } from './tool/app-param';
import { setup } from './tool/app-config';

import { startServer } from './app/.';
import { loadSeeds } from './seeds/.';

export const config = setup()
console.clear()
switch(read()[0]) {
    case 'seeds':
        loadSeeds()
        break
    default:
        startServer()
        break
}