import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { Article, User } from '../../entities';

export type CreateArticleData = {
  user: User;
  title: string;
  slug: string;
  description: string;
};

@Injectable()
export class ArticleService {
  async findOne(id: number): Promise<Article> {
    const article = await getRepository(Article)
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .getOne();

    return article;
  }

  async getArticles(): Promise<Article[]> {
    const articles = await getRepository(Article)
      .createQueryBuilder('article')
      .getMany();

    return articles;
  }

  async create({
    user,
    title,
    slug,
    description,
  }: CreateArticleData): Promise<number> {
    try {
      const insert = await getRepository(Article)
        .createQueryBuilder('article')
        .insert()
        .into(Article)
        .values({ user, title, slug, description })
        .execute();

      return insert.raw.insertId;
    } catch (error) {
      throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
    }
  }
}
