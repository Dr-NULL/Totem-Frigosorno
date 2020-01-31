import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Venta } from '../../interfaces/venta';

export { Venta };

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(
    private httpServ: HttpService
  ) { }

  get(ip: string) {
    return this.httpServ.get<Venta[]>(
      '/api/correlativo/get/' + ip.trim()
    );
  }

  serve(ip: string) {
    return this.httpServ.get<Venta[]>(
      '/api/correlativo/serve/' + ip.trim()
    );
  }
}
