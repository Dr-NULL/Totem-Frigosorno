import {MigrationInterface, QueryRunner} from "typeorm";

export class NewDB1578344739976 implements MigrationInterface {
    name = 'NewDB1578344739976'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "Totem" ("id" int NOT NULL IDENTITY(1,1), "descripc" varchar(50) NOT NULL, "correlat" int NOT NULL CONSTRAINT "DF_9f0236b710afe023c1b585242bc" DEFAULT 1, "ip" varchar(30) NOT NULL, "fechaUltima" varchar(255) NOT NULL CONSTRAINT "DF_dc744fde177a02d5dace5d24f04" DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_0ec9aeb3fec65ee2bd044543d99" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "Totem"`, undefined);
    }

}
