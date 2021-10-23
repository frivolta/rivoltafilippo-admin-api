import {MigrationInterface, QueryRunner} from "typeorm";

export class PostTable1635012202854 implements MigrationInterface {
    name = 'PostTable1635012202854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Post" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_c4d3b3dcd73db0b0129ea829f9f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Post"`);
    }

}
