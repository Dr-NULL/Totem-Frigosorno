import { Event } from '../tool/event';

export const JOIN_TO_TOTEM = new Event()
JOIN_TO_TOTEM.path = 'join-to-totem'
JOIN_TO_TOTEM.callback = (socket, ip: string) => {
    const ARR_NUM = ip
        .replace(/\s+/gi, '')
        .match(/[0-9]+/gi)
    
    if (ARR_NUM == null) {
        socket.disconnect()
        return
    }

    ip = ''
    for (const NUM of ARR_NUM) {
        if (ip.length > 0) {
            ip += '.'
        }

        ip += NUM
    }

    // Añadir a la sala
    socket.join(ip)

    // Forzar actualización del visor
    socket.emit('correlativo-update')
}