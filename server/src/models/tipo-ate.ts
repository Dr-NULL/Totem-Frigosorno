import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TipoAte' })
export class TipoAte extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 1 })
    cod: string;

    @Column({ type: 'varchar', length: 20 })
    descripc: string;
}