import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventMigration1624710336201 implements MigrationInterface {
  name = 'EventMigration1624710336201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `events` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `latitude` double NOT NULL, `longitude` double NOT NULL, `description` mediumtext NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL, UNIQUE INDEX `events-name-unique` (`name`), UNIQUE INDEX `events-slug-unique` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `events-slug-unique` ON `events`');
    await queryRunner.query('DROP INDEX `events-name-unique` ON `events`');
    await queryRunner.query('DROP TABLE `events`');
  }
}
