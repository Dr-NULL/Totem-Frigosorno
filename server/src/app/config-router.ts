import { Request, Response, NextFunction } from 'express';
import { routes } from '../router';
import { app } from '.';

export function configRouter() {
    for (let route of routes) {
        route.path = "/api" + route.path

        switch (route.method) {
            case "get":
                app.get(route.path, wrapAsync(route.callback))
                break
            case "post":
                app.post(route.path, wrapAsync(route.callback))
                break
            case "options":
                app.options(route.path, wrapAsync(route.callback))
                break
            case "put":
                app.put(route.path, wrapAsync(route.callback))
                break
            case "merge":
                app.merge(route.path, wrapAsync(route.callback))
                break
            case "delete":
                app.delete(route.path, wrapAsync(route.callback))
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