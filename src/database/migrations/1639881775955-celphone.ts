import { MigrationInterface, QueryRunner } from 'typeorm';

export class celphone1639881775955 implements MigrationInterface {
  name = 'celphone1639881775955';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" RENAME COLUMN "celphone" TO "phone"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" RENAME COLUMN "phone" TO "celphone"`,
    );
  }
}
