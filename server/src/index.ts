import { read } from './tool/app-param';

import { setup } from './tool/app-config';
import { startServer } from './app/.';

export const config = setup()
console.clear()
switch(read()[0]) {
    default:
        startServer()
        break
}