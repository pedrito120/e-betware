import { MigrationInterface, QueryRunner } from 'typeorm';

export class category1639883671482 implements MigrationInterface {
  name = 'category1639883671482';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "category"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" ADD "category" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
