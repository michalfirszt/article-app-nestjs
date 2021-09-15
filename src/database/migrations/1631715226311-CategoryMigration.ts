import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryMigration1631715226311 implements MigrationInterface {
  name = 'CategoryMigration1631715226311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `categories` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, UNIQUE INDEX `category-name-unique` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `articles_categories` (`article_id` int NOT NULL, `category_id` int NOT NULL, INDEX `index_articles_categories_article_id` (`article_id`), INDEX `index_articles_categories_category_id` (`category_id`), PRIMARY KEY (`article_id`, `category_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `articles_categories` ADD CONSTRAINT `fk_articles_categories_articles_article_id` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `articles_categories` ADD CONSTRAINT `fk_articles_categories_categories_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `articles_categories` DROP FOREIGN KEY `fk_articles_categories_categories_category_id`',
    );
    await queryRunner.query(
      'ALTER TABLE `articles_categories` DROP FOREIGN KEY `fk_articles_categories_articles_article_id`',
    );
    await queryRunner.query(
      'DROP INDEX `index_articles_categories_category_id` ON `articles_categories`',
    );
    await queryRunner.query(
      'DROP INDEX `index_articles_categories_article_id` ON `articles_categories`',
    );
    await queryRunner.query('DROP TABLE `articles_categories`');
    await queryRunner.query(
      'DROP INDEX `category-name-unique` ON `categories`',
    );
    await queryRunner.query('DROP TABLE `categories`');
  }
}
