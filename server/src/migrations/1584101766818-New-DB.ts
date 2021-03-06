import {MigrationInterface, QueryRunner} from "typeorm";

export class NewDB1584101766818 implements MigrationInterface {
    name = 'NewDB1584101766818'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "TipoAte" ("id" int NOT NULL IDENTITY(1,1), "cod" varchar(1) NOT NULL, "descripc" varchar(20) NOT NULL, CONSTRAINT "PK_3d40b60ccee9ec0f95f4b1279ad" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Totem" ("id" int NOT NULL IDENTITY(1,1), "isStandby" bit NOT NULL CONSTRAINT "DF_1ac855b6d81aa68bc9a7f541c33" DEFAULT 1, "descripc" varchar(50) NOT NULL, "ip" varchar(30) NOT NULL, "currCorrelat" int NOT NULL CONSTRAINT "DF_30482be6c83efb8d5ad8a647418" DEFAULT 0, "currFecha" datetime NOT NULL CONSTRAINT "DF_3b2f26d513cc3a8b1ad3556d752" DEFAULT CURRENT_TIMESTAMP, "printerName" varchar(100), "printerIp" varchar(30), CONSTRAINT "PK_0ec9aeb3fec65ee2bd044543d99" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Venta" ("id" int NOT NULL IDENTITY(1,1), "correlat" int NOT NULL, "fecha" datetime NOT NULL CONSTRAINT "DF_a16ee828164f90cc9b6bd6467f2" DEFAULT CURRENT_TIMESTAMP, "isServed" bit NOT NULL CONSTRAINT "DF_d380c7becd79a388ca9a59f0d52" DEFAULT 0, "typedRut" varchar(12), "tipoAteId" int, "clienteId" int, "totemId" int, CONSTRAINT "PK_2e7a31f0c6a99fe691dabfb2fa2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Cliente" ("id" int NOT NULL IDENTITY(1,1), "rut" varchar(12) NOT NULL, "nombres" varchar(100) NOT NULL, "apellidoP" varchar(100) NOT NULL, "apellidoM" varchar(100), "fechaNac" datetime NOT NULL, "telefono" varchar(20), "email" varchar(100), CONSTRAINT "PK_d6b00ec12b8a60095cc4389d35d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "Venta" ADD CONSTRAINT "FK_a5b3ade4dd59a1b865141f43b4e" FOREIGN KEY ("tipoAteId") REFERENCES "TipoAte"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "Venta" ADD CONSTRAINT "FK_11cdd9c57d4b477ebc05600a938" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "Venta" ADD CONSTRAINT "FK_59bf5382a20f351c2ce34743a73" FOREIGN KEY ("totemId") REFERENCES "Totem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Venta" DROP CONSTRAINT "FK_59bf5382a20f351c2ce34743a73"`, undefined);
        await queryRunner.query(`ALTER TABLE "Venta" DROP CONSTRAINT "FK_11cdd9c57d4b477ebc05600a938"`, undefined);
        await queryRunner.query(`ALTER TABLE "Venta" DROP CONSTRAINT "FK_a5b3ade4dd59a1b865141f43b4e"`, undefined);
        await queryRunner.query(`DROP TABLE "Cliente"`, undefined);
        await queryRunner.query(`DROP TABLE "Venta"`, undefined);
        await queryRunner.query(`DROP TABLE "Totem"`, undefined);
        await queryRunner.query(`DROP TABLE "TipoAte"`, undefined);
    }

}
