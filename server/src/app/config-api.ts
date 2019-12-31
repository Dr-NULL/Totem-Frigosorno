import { app } from '.';
import { Api } from '../tool/api';

export function configApi() {
    app.use((req, res, nxt) => {
        res.api = new Api(req, res)

        nxt()
    })
}