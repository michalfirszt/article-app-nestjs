import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Article, User } from '../../entities';

export default class CreateArticles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const userIds = await connection
      .getRepository(User)
      .createQueryBuilder('user')
      .select('user.id')
      .getMany();
    const ids: number[] = userIds.map(({ id }) => id);

    await factory(Article)()
      .map(async (article: Article): Promise<Article> => {
        const user = new User();
        user.id = ids[Math.floor(Math.random() * ids.length)];
        article.user = user;

        return article;
      })
      .createMany(5);
  }
}
