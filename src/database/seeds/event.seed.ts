import { Factory, Seeder } from 'typeorm-seeding';
import { Event } from '../../entities';

export default class CreateEvents implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Event)().createMany(5);
  }
}
