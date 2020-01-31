import express from 'express';
import { createServer } from 'http';
import SocketIO from 'socket.io';

import { Log } from '../tool/log';
import { CONFIG } from '../.';

// Configuraciones del server
import { configJson } from './config-json';
import { configApi } from './config-api';
import { configSession } from './config-session';
import { configRouter } from './config-router';
import { configAngular } from './config-angular';
import { configEvents } from './config-events';
import { createConnection } from 'typeorm';

export const APP = express()
export const HTTP = createServer(APP)
export const IO = SocketIO(HTTP)

export async function startServer() {
    // Levantar TypeORM
    await createConnection()

    // Ejecutar configuraciones
    configJson()
    configApi()
    configSession()
    configRouter()
    configAngular()
    configEvents()

    // Levantar Servidor
    HTTP.listen(CONFIG.server.port, '0.0.0.0', () => {
        Log.title('Totem Frigosorno')
        Log.ok('Servidor listo y desplegado!')
        Log.ln('A la espera de solicitudes...\n')
    })
}