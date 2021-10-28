import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1635437975815 implements MigrationInterface {
    name = 'Test1635437975815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" ALTER COLUMN "isDraft" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" ALTER COLUMN "isDraft" SET NOT NULL`);
    }

}
