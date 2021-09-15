import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserProfileMigration1631716118735 implements MigrationInterface {
  name = 'UserProfileMigration1631716118735';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `profile-user-unique` ON `profiles`');
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD UNIQUE INDEX `index_profiles_user_id` (`user_id`)',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX `relation_profiles_user_id` ON `profiles` (`user_id`)',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD CONSTRAINT `fk_profiles_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `profiles` DROP FOREIGN KEY `fk_profiles_users_user_id`',
    );
    await queryRunner.query(
      'DROP INDEX `relation_profiles_user_id` ON `profiles`',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` DROP INDEX `index_profiles_user_id`',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX `profile-user-unique` ON `profiles` (`user_id`)',
    );
  }
}
