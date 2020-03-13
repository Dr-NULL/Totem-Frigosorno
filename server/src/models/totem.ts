import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: "Totem" })
export class Totem extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "bit", default: 1 })
    isStandby: boolean;
    
    @Column({ type: "varchar", length: 50 })
    descripc: string;
    
    @Column({ type: "varchar", length: 30 })
    ip: string;

    @Column({ type: "int", default: 0 })
    currCorrelat: number;
    
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    currFecha: Date;

    @Column({ type: 'varchar', length: 100, nullable: true })
    printerName: string;
    
    @Column({ type: "varchar", length: 30, nullable: true })
    printerIp: string;
}