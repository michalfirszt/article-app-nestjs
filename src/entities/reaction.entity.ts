import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Article, User } from './index';

export enum ReactionTypes {
  Like = 'like',
  Favorite = 'favorite',
}

@Entity({ name: 'reactions' })
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ReactionTypes, default: ReactionTypes.Like })
  type: ReactionTypes;

  @ManyToOne(() => User, (user) => user.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Article, (article) => article.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'article_id' })
  article: Article;
}
