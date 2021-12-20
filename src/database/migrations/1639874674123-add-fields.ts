import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFields1639874674123 implements MigrationInterface {
  name = 'addFields1639874674123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "createAt"`);
  }
}
