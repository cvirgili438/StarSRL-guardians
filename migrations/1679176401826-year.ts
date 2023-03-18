import { MigrationInterface, QueryRunner } from "typeorm";

export class year1679176401826 implements MigrationInterface {
    name = 'year1679176401826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workSchedule" ADD "year" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workSchedule" DROP COLUMN "year"`);
    }

}
