import Express from 'express';
import { CONFIG } from '../.';
import { APP } from '.';

export function configAngular() {
    APP.use(Express.static(CONFIG.folder.angular))
    APP.use((req, res, nxt) => {
        if (!req.path.toLowerCase().startsWith('/api/')) {
            res.sendFile('index.html', {
                root: CONFIG.folder.angular
            })
        } else {
            nxt()
        }
    })
}