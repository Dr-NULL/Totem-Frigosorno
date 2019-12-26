// Interface de Entrada para errores
export interface RespSuccess<T> {
    meta: any;
    data: T;
  }

export interface RespFailed {
meta: any;
errors: ApiError[];
}

export interface HttpResponse {
status: string;
title: string;
}

export interface ApiError extends HttpResponse {
details: string;
source: ApiErrorSource;
stack?: string;
}

export interface ApiErrorSource {
pointer: string;
parameter: any;
}
