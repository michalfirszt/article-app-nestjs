import { IsArray, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class AssignCategoriesDto {
  @IsString()
  articleId: string;

  @IsArray()
  categoryIds: string[];
}
