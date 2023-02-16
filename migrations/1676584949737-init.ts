import { MigrationInterface, QueryRunner } from "typeorm";

export class init1676584949737 implements MigrationInterface {
    name = 'init1676584949737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workSchedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "day_of_week" integer NOT NULL, "start_time" character varying NOT NULL, "end_time" character varying NOT NULL, "user_id" uuid, "work_place_id" uuid, CONSTRAINT "PK_9dc05ae3a9b9d98bfd6a5d38035" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workSchedule" ADD CONSTRAINT "FK_19df09277e54ae205dfde08dc38" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workSchedule" ADD CONSTRAINT "FK_b723895cc204b9a69ecda50f45e" FOREIGN KEY ("work_place_id") REFERENCES "workPlaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workSchedule" DROP CONSTRAINT "FK_b723895cc204b9a69ecda50f45e"`);
        await queryRunner.query(`ALTER TABLE "workSchedule" DROP CONSTRAINT "FK_19df09277e54ae205dfde08dc38"`);
        await queryRunner.query(`DROP TABLE "workSchedule"`);
    }

}
