import { Factory, Seeder } from 'typeorm-seeding';
import { Category } from '../../entities';

export default class CreateCategories implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Category)().createMany(5);
  }
}
