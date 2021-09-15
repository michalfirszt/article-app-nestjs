import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { getManager } from 'typeorm';

import { ArticleService } from '../../services';
import { Article, User } from '../../entities';
import { JwtAuthGuard } from '../../modules/auth/jwt-auth.guard';
import { AssignCategoriesDto, CreateArticleDto } from './article.validation';
import { createSlug } from '../../utilities';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  async list(): Promise<Article[]> {
    const articles = await this.articleService.getArticles();

    return articles;
  }

  @Get('ids')
  async ids(): Promise<any> {
    const ids = await getManager().query(
      'WITH articleIds AS (SELECT a.id FROM articles AS a) SELECT SUM(id) AS ids FROM articleIds',
    );

    return ids;
  }

  @Get(':id')
  async show(@Param() { id }): Promise<Article> {
    const article = await this.articleService.findOne(id);

    return article;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Query() { title, description }: CreateArticleDto,
    @Req() request,
  ): Promise<Article> {
    const user = new User();
    user.id = request.user.userId;

    const newArticleId = await this.articleService.create({
      user,
      title,
      slug: createSlug(title),
      description,
    });
    const article = await this.articleService.findOne(newArticleId);

    return article;
  }

  @Post('category')
  async category(
    @Query()
    { articleId, categoryIds }: AssignCategoriesDto,
  ): Promise<Article> {
    const article = await this.articleService.findOne(Number(articleId));
    await this.articleService.assignCategories({ article, categoryIds });

    return article;
  }
}
