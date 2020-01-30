import { EndPoint } from './tool/end-point';

// Routes
import { corrGet } from './ctrl/corr-get';
import { corrNext } from './ctrl/corr-next';
import { totemInfo } from './ctrl/totem-info';
import { totemTodos } from './ctrl/totem-todos';
import { clienteBuscar } from './ctrl/cliente-buscar';
import { clienteRegistro } from './ctrl/cliente-registro';
import { clienteActualizar } from './ctrl/cliente-actualizar';

// Ref
export const routes: EndPoint[] = [
    corrGet,
    corrNext,
    totemInfo,
    totemTodos,
    clienteBuscar,
    clienteRegistro,
    clienteActualizar
]