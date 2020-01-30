import { Socket } from 'socket.io';

import { eventsForEveryone, eventsForUser } from '../events';
import { Log } from '../tool/log';
import { io } from '.';

export function configEvents() {
    Log.ev('Declarando Eventos')
    let i = 0;
    // Setear eventos para Usuario
    for (const event of eventsForUser) {
        if (
            (event.path != null) &&
            (event.callback != null)
        ) {
            // Declarar evento
            socket.on(
                event.path,
                event.callback
            )

            Log.ok(`event[${i}]`)
        } else {
            Log.er(`event[${i}] -> Una de sus propiedades es "null".`)
        }
        i++
    }

    i = 0;
    io.on('connection', socket => {
        // Setear eventos para Usuario
        for (const event of eventsForUser) {
            if (
                (event.path != null) &&
                (event.callback != null)
            ) {
                // Declarar evento
                socket.on(
                    event.path,
                    event.callback
                )

                Log.ok(`event[${i}]`)
            } else {
                Log.er(`event[${i}] -> Una de sus propiedades es "null".`)
            }
            i++
        }
    })
}