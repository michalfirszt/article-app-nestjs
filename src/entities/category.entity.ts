import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Article } from './index';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('category-name-unique', ['name'], { unique: true })
  @Column()
  name: string;

  @ManyToMany(() => Article, (article) => article.categories)
  articles: Article[];
}
