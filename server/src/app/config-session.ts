import { crossover } from 'session-crossover';

import { config } from '../.';
import { app } from '.';

export function configSession() {
    app.use(crossover({
        path: config.folder.session,
        expires: 30,        // En minutos...
        isEncrypted: true
    }))
}