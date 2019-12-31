import Express from 'express';
import { config } from '../.';
import { app } from '.';

export function configAngular() {
    app.use(Express.static(config.folder.angular))
    app.get('*', (req, res) => {
        res.sendFile('index.html', {
            root: config.folder.angular
        })
    })
}