import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Totem } from './totem';
import { Cliente } from './cliente';
import { TipoAte } from './tipo-ate';

@Entity({ name: 'Venta' })
export class Venta extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    
    @Column({ type: 'int' })
    correlat: number;

    @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    fecha: Date;
    
    @ManyToOne(type => TipoAte, TipoAte => TipoAte.id, { eager: true })
    tipoAte: TipoAte;

    @ManyToOne(type => Cliente, Cliente => Cliente.id, { eager: true })
    cliente: Cliente;

    @ManyToOne(type => Totem, Totem => Totem.id, { eager: true })
    totem: Totem;
}