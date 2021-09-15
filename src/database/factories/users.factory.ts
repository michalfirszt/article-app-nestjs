import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../../entities';

define(User, (faker: typeof Faker): User => {
  const user = new User();
  user.name = faker.name.firstName();
  user.email = faker.internet.email();

  return user;
});
