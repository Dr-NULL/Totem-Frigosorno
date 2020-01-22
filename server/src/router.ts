import { EndPoint } from './tool/end-point';

// Routes
import { corrNext } from './ctrl/corr-next';
import { totemInfo } from './ctrl/totem-info';
import { clienteRegistro } from './ctrl/cliente-registro';

// Ref
export const routes: EndPoint[] = [
    corrNext,
    totemInfo,
    clienteRegistro
]