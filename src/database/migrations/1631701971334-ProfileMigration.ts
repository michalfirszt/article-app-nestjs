import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfileMigration1631701971334 implements MigrationInterface {
  name = 'ProfileMigration1631701971334';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `profiles` (`id` int NOT NULL AUTO_INCREMENT, `first_name` varchar(255) NULL, `last_name` varchar(255) NULL, `age` int NULL, `user_id` int NULL, UNIQUE INDEX `profile-user-unique` (`user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `profile-user-unique` ON `profiles`');
    await queryRunner.query('DROP TABLE `profiles`');
  }
}
