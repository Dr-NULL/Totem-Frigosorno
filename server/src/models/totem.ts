import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: "Totem" })
export class Totem{
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;
    
    @Column({ type: "varchar", length: 50 })
    descripc: string;
    
    @Column({ type: "int", default: 1 })
    correlat: number;
    
    @Column({ type: "varchar", length: 30 })
    ip: string;
    
    @Column({ type: "varchar", default: () => "CURRENT_TIMESTAMP" })
    fechaUltima: Date;
}