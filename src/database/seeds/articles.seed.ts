import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Article } from '../../entities';

export default class CreateArticles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Article)().createMany(10);
  }
}
