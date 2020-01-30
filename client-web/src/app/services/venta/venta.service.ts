import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Venta } from '../../interfaces/venta';

export { Venta };
interface Voucher {
  id: number;
  corr: number;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(
    private httpServ: HttpService
  ) { }

  get(ip: string) {
    return this.httpServ.get<Venta[]>(
      '/api/corr/get/' + ip.trim()
    );
  }
}
