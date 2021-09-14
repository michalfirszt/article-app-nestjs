import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Article } from '../../entities';

define(Article, (faker: typeof Faker): Article => {
  const article = new Article();
  article.title = faker.lorem.words();
  article.description = faker.lorem.text();
  article.slug = faker.lorem.slug();

  return article;
});
