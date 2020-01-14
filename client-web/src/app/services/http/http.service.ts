import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { RespSuccess, RespFailed, ApiError, ApiErrorSource } from '../../interfaces/api';

const urlServer = '';
const urlClient = location.origin;

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
      throw this.getError(err);
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
      throw this.getError(err);
    }
  }

  private getError(err: any) {
    if (err.errors != null) {
      return err.errors;
    } else {
      const errors: ApiError = {
        status: '500',
        title: 'Internal Server Error',
        details: 'El servidor no responde, por favor contáctese con el depto. de informática.',
        source: err.url
      };

      return [errors];
    }
  }
}
