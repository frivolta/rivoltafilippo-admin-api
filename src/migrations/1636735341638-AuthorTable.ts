import {MigrationInterface, QueryRunner} from "typeorm";

export class AuthorTable1636735341638 implements MigrationInterface {
    name = 'AuthorTable1636735341638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Author" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "picture" character varying NOT NULL, CONSTRAINT "PK_23e89f84c8240e5adee0bcb8edb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "publishedAt"`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "publishedAt" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Post" ADD CONSTRAINT "FK_cef8d6e8edb69c82e5f10bb4026" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" DROP CONSTRAINT "FK_cef8d6e8edb69c82e5f10bb4026"`);
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "publishedAt"`);
        await queryRunner.query(`ALTER TABLE "Post" ADD "publishedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "authorId"`);
        await queryRunner.query(`DROP TABLE "Author"`);
    }

}
