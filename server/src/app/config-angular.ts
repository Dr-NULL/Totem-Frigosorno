import Express from 'express';
import { config } from '../.';
import { app } from '.';

export function configAngular() {
    app.use(Express.static(config.folder.angular))
    app.use((req, res, nxt) => {
        if (!req.path.toLowerCase().startsWith('/api/')) {
            res.sendFile('index.html', {
                root: config.folder.angular
            })
        } else {
            nxt()
        }
    })
}