import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReactionMigration1631717695732 implements MigrationInterface {
  name = 'ReactionMigration1631717695732';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `index_profiles_user_id` ON `profiles`',
    );
    await queryRunner.query(
      "CREATE TABLE `reactions` (`id` int NOT NULL AUTO_INCREMENT, `type` enum ('like', 'favorite') NOT NULL DEFAULT 'like', `user_id` int NULL, `article_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'ALTER TABLE `reactions` ADD CONSTRAINT `fk_reactions_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `reactions` ADD CONSTRAINT `fk_reactions_articles_article_id` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `reactions` DROP FOREIGN KEY `fk_reactions_articles_article_id`',
    );
    await queryRunner.query(
      'ALTER TABLE `reactions` DROP FOREIGN KEY `fk_reactions_users_user_id`',
    );
    await queryRunner.query('DROP TABLE `reactions`');
    await queryRunner.query(
      'CREATE UNIQUE INDEX `index_profiles_user_id` ON `profiles` (`user_id`)',
    );
  }
}
