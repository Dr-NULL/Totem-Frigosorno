import { EndPoint } from './tool/end-point';

// Routes
import { corrNext } from './ctrl/corr-next';
import { totemInfo } from './ctrl/totem-info';

// Ref
export const routes: EndPoint[] = [
    corrNext,
    totemInfo
]