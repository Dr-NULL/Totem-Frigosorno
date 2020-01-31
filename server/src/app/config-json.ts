import { json, urlencoded } from 'body-parser';
import { APP } from '.';

export function configJson() {
    APP.use(json({
        strict: false,
        type: "application/vnd.api+json",
        limit: "50mb"
    }))

    APP.use(urlencoded({
        extended: false
    }))
}