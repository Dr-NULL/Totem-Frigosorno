import { Request, Response } from "express";

//Interface de Entrada para errores
export interface HttpResponse {
    status: string;
    title: string;
}

interface ApiError extends HttpResponse {
    details: string;
    source: ApiErrorSource;
    stack?: string;
}

interface ApiErrorSource {
    pointer: string;
    parameter: any;
}

export module StatusCodes {
    // Respuestas Informativas
    export const cod100: HttpResponse = {
        status: "100",
        title: "Continue",
    };
    
    export const cod101: HttpResponse = {
        status: "101",
        title: "Switching Protocol"
    };
    
    export const cod102: HttpResponse = {
        status: "102",
        title: "Processing"
    };
    
    // Respuestas correctas
    export const cod200: HttpResponse = {
        status: "200",
        title: "OK"
    };
    
    export const cod201: HttpResponse = {
        status: "201",
        title: "Created"
    };
    
    export const cod202: HttpResponse = {
        status: "202",
        title: "Accepted"
    };
    
    export const cod203: HttpResponse = {
        status: "203",
        title: "Non-Authoritative Information"
    };
    
    export const cod204: HttpResponse = {
        status: "204",
        title: "No Content"
    };
    
    export const cod205: HttpResponse = {
        status: "205",
        title: "Reset Content"
    };
    
    export const cod206: HttpResponse = {
        status: "206",
        title: "Partial Content"
    };
    
    export const cod226: HttpResponse = {
        status: "226",
        title: "IM Used"
    };
    
    // Redirecciones
    export const cod300: HttpResponse = {
        status: "300",
        title: "Multiple choice"
    };
    
    export const cod301: HttpResponse = {
        status: "301",
        title: "Moved Permently"
    };
    
    export const cod302: HttpResponse = {
        status: "302",
        title: "Found"
    };
    
    export const cod303: HttpResponse = {
        status: "303",
        title: "See Other"
    };
    
    export const cod304: HttpResponse = {
        status: "304",
        title: "Not Modified"
    };
    
    export const cod305: HttpResponse = {
        status: "305",
        title: "Use Proxy"
    };
    
    export const cod306: HttpResponse = {
        status: "306",
        title: "Unused"
    };
    
    export const cod307: HttpResponse = {
        status: "307",
        title: "Temporaly Redirect"
    };
    
    export const cod308: HttpResponse = {
        status: "308",
        title: "Permanently Redirect"
    };
    
    // Errores de Cliente
    export const cod400: HttpResponse = {
        status: "400",
        title: "Bad Request"
    };
    
    export const cod401: HttpResponse = {
        status: "401",
        title: "Unauthorized"
    };
    
    export const cod402: HttpResponse = {
        status: "402",
        title: "Payment Required"
    };
    
    export const cod403: HttpResponse = {
        status: "403",
        title: "Forbidden"
    };
    
    export const cod404: HttpResponse = {
        status: "404",
        title: "Not Found"
    };
    
    export const cod405: HttpResponse = {
        status: "405",
        title: "Method Not Allowed"
    };
    
    export const cod406: HttpResponse = {
        status: "406",
        title: "Not Acceptable"
    };
    
    export const cod407: HttpResponse = {
        status: "407",
        title: "Proxy Authentication Required"
    };
    
    export const cod408: HttpResponse = {
        status: "408",
        title: "Request Timeout"
    };
    
    export const cod409: HttpResponse = {
        status: "409",
        title: "Conflict"
    };
    
    export const cod410: HttpResponse = {
        status: "410",
        title: "Gone"
    };
    
    export const cod411: HttpResponse = {
        status: "411",
        title: "Length Required"
    };
    
    export const cod412: HttpResponse = {
        status: "412",
        title: "Precondition Failed"
    };
    
    export const cod413: HttpResponse = {
        status: "413",
        title: "Payload Too Large"
    };
    
    export const cod414: HttpResponse = {
        status: "414",
        title: "URI Too Long"
    };
    
    export const cod415: HttpResponse = {
        status: "415",
        title: "Unsupported Media Type"
    };
    
    export const cod416: HttpResponse = {
        status: "416",
        title: "Requested Range Not Satisfiable"
    };
    
    export const cod417: HttpResponse = {
        status: "417",
        title: "Expectation Failed"
    };
    
    export const cod418: HttpResponse = {
        status: "418",
        title: "I'm A Teapot"
    };
    
    export const cod421: HttpResponse = {
        status: "421",
        title: "Misdirected Request"
    };
    
    export const cod422: HttpResponse = {
        status: "422",
        title: "Unprocessable Entity"
    };
    
    export const cod423: HttpResponse = {
        status: "423",
        title: "Locked"
    };
    
    export const cod424: HttpResponse = {
        status: "424",
        title: "Failed Dependency"
    };
    
    export const cod426: HttpResponse = {
        status: "426",
        title: "Upgrade Required"
    };
    
    export const cod428: HttpResponse = {
        status: "428",
        title: "Precondition Required"
    };
    
    export const cod429: HttpResponse = {
        status: "429",
        title: "Too Many Requests"
    };
    
    export const cod431: HttpResponse = {
        status: "431",
        title: "Request Header Fields Too Large"
    };
    
    export const cod451: HttpResponse = {
        status: "451",
        title: "Unavailable For Legal Reasons"
    };

    // Errores del servidor
    export const cod500: HttpResponse = {
        status: "500",
        title: "Internal Server Error"
    };
    
    export const cod501: HttpResponse = {
        status: "501",
        title: "Not Implemented"
    };
    
    export const cod502: HttpResponse = {
        status: "502",
        title: "Bad Gateway"
    };
    
    export const cod503: HttpResponse = {
        status: "503",
        title: "Service Unavailable"
    };
    
    export const cod504: HttpResponse = {
        status: "504",
        title: "Gateway Timeout"
    };
    
    export const cod505: HttpResponse = {
        status: "505",
        title: "HTTP Version Not Supported"
    };
    
    export const cod506: HttpResponse = {
        status: "506",
        title: "Variant Also Negotiates"
    };
    
    export const cod508: HttpResponse = {
        status: "508",
        title: "Loop Detected"
    };
    
    export const cod510: HttpResponse = {
        status: "510",
        title: "Not Extended"
    };
    
    export const cod511: HttpResponse = {
        status: "511",
        title: "Network Authentication Required"
    };
}

// Extender Response
declare global {
    namespace Express {
        export interface Response{
            api: Api
        }
    }
}

// API Wrapper
export class Api {
    private meta = {
        brand: "Frigosorno S.A.",
        country: "Chile",
        authors: [
            "Felipe Silva"
        ]
    }

    private req: Request
    private res: Response

    constructor(req: Request, res: Response){
        this.req = req
        this.res = res
    }

    public send(data: any = null) {
        this.res.contentType("application/vnd.api+json")
        this.res.send({
            data: data,
            meta: this.meta
        })
    }

    public failed(...fail: Array<{
        HttpResponse: HttpResponse;
        details: string;
    }>) {
        // Configurar errores
        this.res.contentType("application/vnd.api+json")
        
        // Get Parameters
        let param: any = {}
        if (this.req.method.toLowerCase() == "get") {
            param = this.req.params
        } else {
            param = this.req.body
        }

        let arrFail: ApiError[] = []
        for (let item of fail) {
            arrFail.push({
                status: item.HttpResponse.status,
                title: item.HttpResponse.title,
                details: item.details,
                source: {
                    pointer: this.req.originalUrl,
                    parameter: param
                }
            })
        }

        this.res.status(parseInt(arrFail[arrFail.length - 1].status))
        this.res.send({
            errors: arrFail,
            meta: this.meta
        })
    }

    public catch(fail: any) {
        // Configurar errores
        this.res.contentType("application/vnd.api+json")
        
        // Get Parameters
        let param: any = {}
        if (this.req.method.toLowerCase() == "get") {
            param = this.req.params
        } else {
            param = this.req.body
        }

        // Get message
        let msg = fail.message
        if (msg == null) {
            msg = fail
        }

        this.res.send({
            errors: [{
                status: StatusCodes.cod500.status,
                title: StatusCodes.cod500.title,
                details: msg,
                stack: fail.stack,
                source: {
                    pointer: this.req.originalUrl,
                    parameter: param
                }
            } as ApiError],
            meta: this.meta
        })
    }
}