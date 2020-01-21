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
}
