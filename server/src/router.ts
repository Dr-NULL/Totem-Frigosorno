import { EndPoint } from './tool/end-point';

// Routes
import { CORRELAT_GET } from './endpoints/correlat-get';
import { CORRELAT_NEXT } from './endpoints/correlat-next';
import { CORRELAT_SERVE } from './endpoints/correlat-serve';
import { TOTEM_INFO } from './endpoints/totem-info';
import { TOTEM_TODOS } from './endpoints/totem-todos';
import { CLIENTE_BUSCAR } from './endpoints/cliente-buscar';
import { CLIENTE_REGISTRO } from './endpoints/cliente-registro';
import { CLIENTE_ACTUALIZAR } from './endpoints/cliente-actualizar';

// Ref
export const ROUTES: EndPoint[] = [
    CORRELAT_GET,
    CORRELAT_NEXT,
    CORRELAT_SERVE,
    TOTEM_INFO,
    TOTEM_TODOS,
    CLIENTE_BUSCAR,
    CLIENTE_REGISTRO,
    CLIENTE_ACTUALIZAR
]