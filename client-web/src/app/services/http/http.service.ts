import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespSuccess, RespFailed, ApiError, ApiErrorSource } from '../../interfaces/api';

const urlServer = '';
const urlClient = 'http://localhost:4200';

const opt = {
  // withCredentials: true,
  headers: new HttpHeaders({
    'content-type': 'application/vnd.api+json',
    'Access-Control-Allow-Origin': urlClient,
    'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private httpCtrl: HttpClient
  ) { }

  async get<T = any>(url: string) {
    const path = urlServer + url;
    let res: RespSuccess<T> | RespFailed;

    try {
      const obs = this.httpCtrl.get<RespSuccess<T> | RespFailed>(path, opt);
      const prm = obs.toPromise<RespSuccess<T> | RespFailed>();
      res = await prm;
      return res as RespSuccess<T>;

    } catch (err) {
      throw err.errors;
    }
  }

  async post<T = any>(url: string, data: any) {
    const path = urlServer + url;
    let res: RespSuccess<T> | RespFailed;

    try {
      const obs = this.httpCtrl.post<RespSuccess<T> | RespFailed>(path, JSON.stringify(data), opt);
      const prm = obs.toPromise<RespSuccess<T> | RespFailed>();
      res = await prm;
      return res as RespSuccess<T>;

    } catch (err) {
      throw err.errors;
    }
  }
}
