import { EndPoint } from './tool/end-point';

// Routes
import { corrNext } from './ctrl/corr-next';
import { totemInfo } from './ctrl/totem-info';
import { clienteBuscar } from './ctrl/cliente-buscar';
import { clienteRegistro } from './ctrl/cliente-registro';
import { clienteActualizar } from './ctrl/cliente-actualizar';

// Ref
export const routes: EndPoint[] = [
    corrNext,
    totemInfo,
    clienteBuscar,
    clienteRegistro,
    clienteActualizar
]