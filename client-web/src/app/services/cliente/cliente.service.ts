import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Cliente } from '../../interfaces/cliente';

export { Cliente };

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(
    private httpCtrl: HttpService
  ) { }

  registro(data: Cliente) {
    return this.httpCtrl.post(
      '/api/cliente/registro',
      data
    );
  }

  buscar(rut: string) {
    return this.httpCtrl.get<Cliente>(
      '/api/cliente/buscar/' + rut.replace(/[^0-9k]/gi, '')
    );
  }

  actualizar(data: Cliente) {
    return this.httpCtrl.post<Cliente>(
      '/api/cliente/actualizar',
      data
    );
  }
}
