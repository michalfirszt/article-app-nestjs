import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Index,
} from 'typeorm';

import { User } from './user.entity';

@Entity({ name: 'articles' })
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('articles-title-unique', ['title'], { unique: true })
  @Column()
  title: string;

  @Index('articles-slug-unique', ['slug'], { unique: true })
  @Column()
  slug: string;

  @Column({ type: 'mediumtext' })
  description: string;

  @Column({ default: true })
  active: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: string | null;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  updatedAt: string | null;

  @ManyToOne((type) => User, (user) => user.articles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
