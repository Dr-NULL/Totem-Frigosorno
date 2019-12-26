import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespSuccess, RespFailed, ApiError, ApiErrorSource } from '../../interfaces/api';

const urlServer = 'http://localhost/api';
const urlClient = 'http://localhost:4200';

const opt = {
  withCredentials: true,
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

    } catch (err) {
      // Error desde el cliente
      throw this.makeGenericErr(err, path);
    }

    if ((res as RespFailed).errors != null) {
      // Error Procesado por el servidor
      throw res;
    } else {
      // Respuesta correcta
      return res as RespSuccess<T>;
    }
  }

  async post<T = any>(url: string, data: any) {
    const path = urlServer + url;
    let res: RespSuccess<T> | RespFailed;

    try {
      const obs = this.httpCtrl.post<RespSuccess<T> | RespFailed>(path, JSON.stringify(data), opt);
      const prm = obs.toPromise<RespSuccess<T> | RespFailed>();
      res = await prm;
    } catch (err) {
      // Error desde el cliente
      throw this.makeGenericErr(err, path);
    }

    if ((res as RespFailed).errors != null) {
      // Error Procesado por el servidor
      throw res;
    } else {
      // Respuesta correcta
      return res as RespSuccess<T>;
    }
  }

  async uploadFile<T = any>(url: string, files: File[], data: any = null) {
    const path = urlServer + url;
    const form = new FormData();
    let res: RespSuccess<T> | RespFailed;

    if (data != null) {
      form.append('data', data);
    }

    files.forEach(file => {
      form.append('file', file);
    });

    try {
      const obs = this.httpCtrl.post<RespSuccess<T> | RespFailed>(path, form, opt);
      const prm = obs.toPromise<RespSuccess<T> | RespFailed>();
      res = await prm;
    } catch (err) {
      // Error desde el cliente
      throw this.makeGenericErr(err, path);
    }

    if ((res as RespFailed).errors != null) {
      // Error Procesado por el servidor
      throw res;
    } else {
      // Respuesta correcta
      return res as RespSuccess<T>;
    }
  }

  private makeGenericErr(err: Error, url: string) {
    const fail: ApiError = {
      status: '409',
      title: 'Conflict',
      details: err.message,
      stack: err.stack,
      source: {
        pointer: url,
        parameter: null
      }
    };

    return {
      errors: [fail],
      meta: {
        company: 'Frigosorno S.A.',
        country: 'Chile',
        authors: [
            'Felipe Silva'
        ]
      }
    } as RespFailed;
  }
}
