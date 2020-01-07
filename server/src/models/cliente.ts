import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Venta } from './venta';

@Entity({ name: 'Cliente' })
export class Cliente extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;
    
    @Column({ type: "varchar", length: 12 })
    rut: string;
    
    @Column({ type: "varchar", length: 100 })
    nombres: string;
    
    @Column({ type: "varchar", length: 100 })
    apellidoP: string;
    
    @Column({ type: "varchar", length: 100 })
    apellidoM: string;
    
    @Column({ type: "datetime" })
    fechaNac: Date;
    
    @Column({ type: "decimal", precision: 15, scale: 0, nullable: true })
    telefono: number;
    
    @Column({ type: "varchar", length: 100, nullable: true })
    email: string;

    @OneToMany(type => Venta, Venta => Venta.id)
    ventas: Promise<Venta[]>;
}