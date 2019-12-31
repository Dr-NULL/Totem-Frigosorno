import express from "express"
import { Request, Dictionary } from "express-serve-static-core";

export class EndPoint{
    private _method : "get" | "post" | "options" | "put" | "delete" | "merge" | "form-data";
    public get method() : "get" | "post" | "options" | "put" | "delete" | "merge" | "form-data" {
        return this._method;
    }
    public set method(v : "get" | "post" | "options" | "put" | "delete" | "merge" | "form-data") {
        this._method = v;
    }
    
    private _path : string;
    public get path() : string {
        return this._path;
    }
    public set path(v : string) {
        this._path = v;
    }
    
    private _callback : (req: Request<Dictionary<string>>, res: express.Response) => void;
    public get callback() : (req: Request<Dictionary<string>>, res: express.Response) => void {
        return this._callback;
    }
    public set callback(v : (req: Request<Dictionary<string>>, res: express.Response) => void) {
        this._callback = v;
    }

    public constructor() {
        this._method = "get"
        this._path = "/"
        this._callback = (req, res) => {}
    }
}