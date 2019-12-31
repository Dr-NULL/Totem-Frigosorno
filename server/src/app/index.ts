import express from 'express';
import { Log } from '../tool/log';
import { config } from '../.';

// Configuraciones del server
import { configJson } from './config-json';
import { configApi } from './config-api';
import { configSession } from './config-session';
import { configRouter } from './config-router';
import { configAngular } from './config-angular';

export const app = express()
export async function startServer() {
    // Ejecutar configuraciones
    configJson();
    configApi();
    configSession();
    configRouter();
    configAngular();

    // Levantar Servidor
    app.listen(config.server.port, () => {
        Log.title('Totem Frigosorno')
        Log.ok('Servidor listo y desplegado!')
        Log.ln('A la espera de solicitudes...')
    })
}