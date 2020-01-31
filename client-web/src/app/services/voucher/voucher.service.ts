import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  constructor(
    private httpCtrl: HttpService
  ) { }

  print() {
    return this.httpCtrl.get('/api/correlativo/next/');
  }

  printRut(rut: string) {
    rut = rut.replace(/[^0-9^k]/gi, '');
    return this.httpCtrl.get('/api/correlativo/next/' + rut);
  }
}
