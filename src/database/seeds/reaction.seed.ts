import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { Article, User, Reaction } from '../../entities';

export default class CreateReactions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const users = await connection
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
    const articles = await connection
      .getRepository(Article)
      .createQueryBuilder('article')
      .getMany();

    const reactionsData = articles.reduce(
      (acc, article) => acc.concat(users.map((user) => ({ article, user }))),
      [],
    );

    const reactions: Reaction[] = reactionsData.map((reactionData) => {
      const reaction = new Reaction();
      reaction.article = reactionData.article;
      reaction.user = reactionData.user;

      return reaction;
    });

    await connection.manager.save(reactions);
  }
}
