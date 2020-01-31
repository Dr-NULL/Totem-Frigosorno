import { APP } from '.';
import { Api } from '../tool/api';

export function configApi() {
    APP.use((req, res, nxt) => {
        res.api = new Api(req, res)

        nxt()
    })
}