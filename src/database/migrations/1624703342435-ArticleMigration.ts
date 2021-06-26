import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArticleMigration1624703342435 implements MigrationInterface {
  name = 'ArticleMigration1624703342435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `articles` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `description` mediumtext NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL, `user_id` int NULL, UNIQUE INDEX `articles-title-unique` (`title`), UNIQUE INDEX `articles-slug-unique` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `articles` ADD CONSTRAINT `fk_articles_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `articles` DROP FOREIGN KEY `fk_articles_users_user_id`',
    );
    await queryRunner.query('DROP INDEX `articles-slug-unique` ON `articles`');
    await queryRunner.query('DROP INDEX `articles-title-unique` ON `articles`');
    await queryRunner.query('DROP TABLE `articles`');
  }
}
