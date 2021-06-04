import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1622745767269 implements MigrationInterface {
  name = 'UserMigration1622745767269';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `email_verified_at` timestamp NULL, `password` varchar(255) NULL, `active` tinyint NOT NULL DEFAULT 1, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL, UNIQUE INDEX `users-email-unique` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `users-email-unique` ON `users`');
    await queryRunner.query('DROP TABLE `users`');
  }
}
