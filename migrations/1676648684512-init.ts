import { MigrationInterface, QueryRunner } from "typeorm";

export class init1676648684512 implements MigrationInterface {
    name = 'init1676648684512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workPlaces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_d3899e0a8bfff269d41f941879b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workSchedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "day_of_week" integer NOT NULL, "start_time" character varying NOT NULL, "end_time" character varying NOT NULL, "user_id" uuid, "work_place_id" uuid, CONSTRAINT "PK_9dc05ae3a9b9d98bfd6a5d38035" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN', 'SUPERVISOR')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "age" integer NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workSchedule" ADD CONSTRAINT "FK_19df09277e54ae205dfde08dc38" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workSchedule" ADD CONSTRAINT "FK_b723895cc204b9a69ecda50f45e" FOREIGN KEY ("work_place_id") REFERENCES "workPlaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workSchedule" DROP CONSTRAINT "FK_b723895cc204b9a69ecda50f45e"`);
        await queryRunner.query(`ALTER TABLE "workSchedule" DROP CONSTRAINT "FK_19df09277e54ae205dfde08dc38"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "workSchedule"`);
        await queryRunner.query(`DROP TABLE "workPlaces"`);
    }

}
