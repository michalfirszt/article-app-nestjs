import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Event } from '../../entities';

define(Event, (faker: typeof Faker): Event => {
  const event = new Event();
  event.name = faker.lorem.words();
  event.description = faker.lorem.text();
  event.slug = faker.lorem.slug();
  event.latitude = Number(faker.address.latitude());
  event.longitude = Number(faker.address.longitude());

  return event;
});
