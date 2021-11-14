import {MigrationInterface, QueryRunner} from "typeorm";

export class ExcerptField1636928669906 implements MigrationInterface {
    name = 'ExcerptField1636928669906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" ADD "excerpt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "excerpt"`);
    }

}
