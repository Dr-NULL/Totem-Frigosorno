import { Request, Response, NextFunction } from 'express';
import { ROUTES } from '../router';
import { APP } from '.';

export function configRouter() {
    for (let route of ROUTES) {
        route.path = "/api" + route.path

        switch (route.method) {
            case "get":
                APP.get(route.path, wrapAsync(route.callback))
                break
            case "post":
                APP.post(route.path, wrapAsync(route.callback))
                break
            case "options":
                APP.options(route.path, wrapAsync(route.callback))
                break
            case "put":
                APP.put(route.path, wrapAsync(route.callback))
                break
            case "merge":
                APP.merge(route.path, wrapAsync(route.callback))
                break
            case "delete":
                APP.delete(route.path, wrapAsync(route.callback))
                break
        }
    }
}

function wrapAsync(fn: any) {
    return function(req: Request, res: Response, nxt: NextFunction) {
        try {
            fn(req, res, nxt)
        } catch (err) {
            nxt(err)
        }
    }
}