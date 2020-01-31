import { crossover } from 'session-crossover';

import { CONFIG } from '../.';
import { APP } from '.';

export function configSession() {
    APP.use(crossover({
        path: CONFIG.folder.session,
        expires: 30,        // En minutos...
        isEncrypted: true
    }))
}