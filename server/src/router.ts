import { EndPoint } from './tool/end-point';

// Routes
import { CORRELAT_GET } from './ctrl/correlat-get';
import { CORRELAT_NEXT } from './ctrl/correlat-next';
import { CORRELAT_SERVE } from './ctrl/correlat-serve';
import { TOTEM_INFO } from './ctrl/totem-info';
import { TOTEM_TODOS } from './ctrl/totem-todos';
import { CLIENTE_BUSCAR } from './ctrl/cliente-buscar';
import { CLIENTE_REGISTRO } from './ctrl/cliente-registro';
import { CLIENTE_ACTUALIZAR } from './ctrl/cliente-actualizar';

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