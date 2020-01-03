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
    return this.httpCtrl.get('http://localhost:2020/print/');
  }
}
