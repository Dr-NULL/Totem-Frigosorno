import { Venta } from './venta';

export interface Cliente {
  id?: number;
  rut: string;
  nombres: string;
  apellidoP: string;
  apellidoM: string;
  fechaNac: Date;
  telefono: string;
  email: string;
  ventas?: Venta[];
}
