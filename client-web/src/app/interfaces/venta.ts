import { Totem } from './totem';
import { Cliente } from './cliente';
import { TipoAte } from './tipo-ate';

export interface Venta {
  id: number;
  correlat: number;
  fecha: Date;
  tipoAte: TipoAte;
  cliente: Cliente;
  totem: Totem;
}
