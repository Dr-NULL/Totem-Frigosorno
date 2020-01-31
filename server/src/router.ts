import { EndPoint } from './tool/end-point';

// Routes
import { CORRELATIVO_GET } from './ctrl/correlativo-get';
import { CORRELATIVO_NEXT } from './ctrl/correlativo-next';
import { CORRELATIVO_SERVE } from './ctrl/correlativo-serve';
import { TOTEM_INFO } from './ctrl/totem-info';
import { TOTEM_TODOS } from './ctrl/totem-todos';
import { CLIENTE_BUSCAR } from './ctrl/cliente-buscar';
import { CLIENTE_REGISTRO } from './ctrl/cliente-registro';
import { CLIENTE_ACTUALIZAR } from './ctrl/cliente-actualizar';

// Ref
export const ROUTES: EndPoint[] = [
    CORRELATIVO_GET,
    CORRELATIVO_NEXT,
    CORRELATIVO_SERVE,
    TOTEM_INFO,
    TOTEM_TODOS,
    CLIENTE_BUSCAR,
    CLIENTE_REGISTRO,
    CLIENTE_ACTUALIZAR
]