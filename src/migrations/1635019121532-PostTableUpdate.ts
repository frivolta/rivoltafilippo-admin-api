import {MigrationInterface, QueryRunner} from "typeorm";

export class PostTableUpdate1635019121532 implements MigrationInterface {
    name = 'PostTableUpdate1635019121532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "img" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "isDraft" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "isDraft"`);
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "img"`);
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

}
