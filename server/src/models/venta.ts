import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TipoAte } from './tipo-ate';
import { Cliente } from './cliente';
import { Totem } from './totem';

@Entity({ name: 'Venta' })
export class Venta extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    
    @Column({ type: 'int' })
    correlat: number;

    @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    fecha: Date;

    @Column({ type: 'bit', default: 0 })
    isServed: boolean;

    @Column({ type: 'varchar', length: 12, nullable: true })
    typedRut: string;
    
    @ManyToOne(type => TipoAte, TipoAte => TipoAte.id, { eager: true })
    tipoAte: TipoAte;

    @ManyToOne(type => Cliente, Cliente => Cliente.id, { eager: true })
    cliente: Cliente;

    @ManyToOne(type => Totem, Totem => Totem.id, { eager: true })
    totem: Totem;
}