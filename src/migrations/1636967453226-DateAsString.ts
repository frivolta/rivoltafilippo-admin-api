import {MigrationInterface, QueryRunner} from "typeorm";

export class DateAsString1636967453226 implements MigrationInterface {
    name = 'DateAsString1636967453226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "publishedAt"`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "publishedAt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "publishedAt"`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "publishedAt" date NOT NULL`);
    }

}
