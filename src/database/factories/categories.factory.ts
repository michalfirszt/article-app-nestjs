import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Category } from '../../entities';

define(Category, (faker: typeof Faker): Category => {
  const category = new Category();
  category.name = faker.lorem.words();

  return category;
});
