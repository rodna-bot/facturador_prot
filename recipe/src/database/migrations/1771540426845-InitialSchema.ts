import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1771540426845 implements MigrationInterface {
    name = 'InitialSchema1771540426845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("codigo" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, CONSTRAINT "PK_5def9cb8b6a53b45e58ab82e37e" PRIMARY KEY ("codigo"))`);
        await queryRunner.query(`CREATE TABLE "clientes" ("codigo" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "esEmpresa" boolean NOT NULL DEFAULT false, "dni" character varying(8), "ruc" character varying(11), CONSTRAINT "PK_38777c5bca00ee20f9b57bc4b38" PRIMARY KEY ("codigo"))`);
        await queryRunner.query(`CREATE TABLE "sedes" ("codigo" SERIAL NOT NULL, "direccion" character varying NOT NULL, "departamento" character varying NOT NULL, "provincia" character varying NOT NULL, "distrito" character varying NOT NULL, "telefono" integer NOT NULL, CONSTRAINT "PK_20009471d2f52ec388721d6fa18" PRIMARY KEY ("codigo"))`);
        await queryRunner.query(`CREATE TABLE "productos_servicios" ("codigo" SERIAL NOT NULL, "descripcion" character varying NOT NULL, "precio" numeric(10,2) NOT NULL, "precio_total" numeric(10,2) NOT NULL, CONSTRAINT "PK_f82f92f8f70244aa63243a2eec1" PRIMARY KEY ("codigo"))`);
        await queryRunner.query(`CREATE TABLE "tipos_documento" ("codigo" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, CONSTRAINT "PK_39b02d9b468ed1ce15e9b51e78c" PRIMARY KEY ("codigo"))`);
        await queryRunner.query(`CREATE TABLE "comprobantes" ("codigo" SERIAL NOT NULL, "fecha_emision" date NOT NULL, "fecha_vencimiento" date NOT NULL, "moneda" character varying NOT NULL, "igv" double precision NOT NULL, "tipo_pago" character varying NOT NULL, "nro_cuotas" integer, "codigo_cliente" integer, "codigo_usuario" integer, "codigo_sede" integer, "codigo_producto_servicio" integer, "codigo_tipo_documento" integer, CONSTRAINT "PK_018f64751a9ec277d470eda4576" PRIMARY KEY ("codigo"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("codigo" SERIAL NOT NULL, "ruc" bigint, "razon_social" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_185ded9881a8bce38274b40faef" PRIMARY KEY ("codigo"))`);
        await queryRunner.query(`CREATE TABLE "usuarios_roles" ("usuariosCodigo" integer NOT NULL, "rolesCodigo" integer NOT NULL, CONSTRAINT "PK_6d059baaaf832f7a65b6da87ee4" PRIMARY KEY ("usuariosCodigo", "rolesCodigo"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9de645fea0725a6c1042e19a95" ON "usuarios_roles" ("usuariosCodigo") `);
        await queryRunner.query(`CREATE INDEX "IDX_2e659ab96f72a45326ad5ee9dc" ON "usuarios_roles" ("rolesCodigo") `);
        await queryRunner.query(`ALTER TABLE "comprobantes" ADD CONSTRAINT "FK_e933b91df8b6f3436201517a11b" FOREIGN KEY ("codigo_cliente") REFERENCES "clientes"("codigo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comprobantes" ADD CONSTRAINT "FK_638294e6bf28493e335773fe545" FOREIGN KEY ("codigo_usuario") REFERENCES "usuarios"("codigo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comprobantes" ADD CONSTRAINT "FK_cf120f9cc1b31e559e9bd509af4" FOREIGN KEY ("codigo_sede") REFERENCES "sedes"("codigo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comprobantes" ADD CONSTRAINT "FK_c67c107ce8a1699f65a377b9dbc" FOREIGN KEY ("codigo_producto_servicio") REFERENCES "productos_servicios"("codigo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comprobantes" ADD CONSTRAINT "FK_72175ba98d248d3f3e38283d24e" FOREIGN KEY ("codigo_tipo_documento") REFERENCES "tipos_documento"("codigo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios_roles" ADD CONSTRAINT "FK_9de645fea0725a6c1042e19a952" FOREIGN KEY ("usuariosCodigo") REFERENCES "usuarios"("codigo") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarios_roles" ADD CONSTRAINT "FK_2e659ab96f72a45326ad5ee9dc4" FOREIGN KEY ("rolesCodigo") REFERENCES "roles"("codigo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios_roles" DROP CONSTRAINT "FK_2e659ab96f72a45326ad5ee9dc4"`);
        await queryRunner.query(`ALTER TABLE "usuarios_roles" DROP CONSTRAINT "FK_9de645fea0725a6c1042e19a952"`);
        await queryRunner.query(`ALTER TABLE "comprobantes" DROP CONSTRAINT "FK_72175ba98d248d3f3e38283d24e"`);
        await queryRunner.query(`ALTER TABLE "comprobantes" DROP CONSTRAINT "FK_c67c107ce8a1699f65a377b9dbc"`);
        await queryRunner.query(`ALTER TABLE "comprobantes" DROP CONSTRAINT "FK_cf120f9cc1b31e559e9bd509af4"`);
        await queryRunner.query(`ALTER TABLE "comprobantes" DROP CONSTRAINT "FK_638294e6bf28493e335773fe545"`);
        await queryRunner.query(`ALTER TABLE "comprobantes" DROP CONSTRAINT "FK_e933b91df8b6f3436201517a11b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2e659ab96f72a45326ad5ee9dc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9de645fea0725a6c1042e19a95"`);
        await queryRunner.query(`DROP TABLE "usuarios_roles"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "comprobantes"`);
        await queryRunner.query(`DROP TABLE "tipos_documento"`);
        await queryRunner.query(`DROP TABLE "productos_servicios"`);
        await queryRunner.query(`DROP TABLE "sedes"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
