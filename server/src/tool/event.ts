import { Socket } from 'socket.io';

export class Event {
    public static readonly prefix = '/io'
    
    private _path : string;
    public get path() : string {
        return this._path;
    }
    public set path(v : string) {
        // Borrar Prefijo si es que existe
        const reg = new RegExp(`^${Event.prefix}`, 'gi')
        if (v.match(v) != null) {
            v = v.replace(reg, '')
        }

        // Añadir slash al inicio
        if (v.match(/^\//gi) == null) {
            v = '/' + v;
        }
        
        // Agregar Prefijo
        this._path = Event.prefix + v;
    }
    
    private _callback : (data?: any) => void;
    public get callback() : (data?: any) => void {
        return this._callback;
    }
    public set callback(v : (data?: any) => void) {
        this._callback = v;
    }
    
}