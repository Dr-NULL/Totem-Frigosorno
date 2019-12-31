import { json, urlencoded } from 'body-parser';
import { app } from '.';

export function configJson() {
    app.use(json({
        strict: false,
        type: "application/vnd.api+json",
        limit: "50mb"
    }))

    app.use(urlencoded({
        extended: false
    }))
}