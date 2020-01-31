import { EVENTS } from '../events';
import { Log } from '../tool/log';
import { IO } from '.';

export function configEvents() {
    // Setear eventos para Usuario
    IO.on('connection', socket => {
        Log.ev('Nuevo Usuario Detectado!')
        for (const event of EVENTS) {
            if (
                (event.path != null) &&
                (event.callback != null)
            ) {
                // Declarar evento
                socket.on(
                    event.path,
                    data => {
                        event.callback(
                            socket,
                            data
                        )
                    }
                )
            }
        }
        Log.ok('Eventos asignados.\n')
    })
}