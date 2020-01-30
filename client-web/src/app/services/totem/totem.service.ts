import { HttpService } from '../http/http.service';
import { Injectable } from '@angular/core';
import { Totem } from '../../interfaces/totem';
export { Totem };

@Injectable({
  providedIn: 'root'
})
export class TotemService {

  constructor(
    private httpServ: HttpService
  ) { }

  info() {
    return this.httpServ.get<Totem>('/api/totem/info');
  }

  todos() {
    return this.httpServ.get<Totem[]>('/api/totem/todos');
  }
}
