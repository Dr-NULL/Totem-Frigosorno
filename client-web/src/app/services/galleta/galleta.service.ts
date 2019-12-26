import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GalletaService {

  constructor() { }

  new<T = any>(value: T, name: string, min: number) {
    // Crear la cookie
    let make = name + '=';
    make += btoa(JSON.stringify({ d: value })) + '; ';
    make += 'path=/; ';

    if (min !== undefined) {
        // Fecha Expiración
        const expire = new Date();
        expire.setTime(expire.getTime() + (1000 * 60 * min));

        make += 'expires=' + expire.toUTCString() + ';';
    }

    document.cookie = make.trim();
  }

  get<T = any>(name: string) {
    const stage1 = document.cookie.split(';');
    let value = null;
    for (const st1 of stage1) {
      const data = st1.split('=');

      if (data[0].trim() === name) {
          let parsed = JSON.parse(atob(data[1])).d;
          if (parsed == null) {
              parsed = data[1];
          }
          value = parsed;
          break;
      }
    }

    return value as T;
  }

  update<T = any>(value: T, name: string) {
    // Edita la cookie
    let make = name + '=';
    make += btoa(JSON.stringify({ d: value })) + '; ';
    make += 'path=/;';
    document.cookie = make.trim();
  }

  kill(name: string) {
    // Asigna valor nulo
    let make = name + '=null; ';
    make += 'path=/; ';

    // Fecha Expiración
    const expire = new Date(0, 0, 0);
    make += 'expires=' + expire.toUTCString() + ';';
    document.cookie = make.trim();
  }
}
