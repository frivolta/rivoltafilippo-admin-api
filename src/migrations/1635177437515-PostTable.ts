import {MigrationInterface, QueryRunner} from "typeorm";

export class PostTable1635177437515 implements MigrationInterface {
    name = 'PostTable1635177437515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "mediumUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "redditUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "publishedAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "publishedAt"`);
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "redditUrl"`);
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "mediumUrl"`);
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "title"`);
    }

}
