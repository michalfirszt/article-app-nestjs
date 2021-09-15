import {
  Column,
  Entity,
  Index,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Article, Profile } from './index';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Index('users-email-unique', ['email'], { unique: true })
  @Column()
  email: string;

  @Column({
    name: 'email_verified_at',
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  emailVerifiedAt: string | null;

  @Column({ nullable: true })
  password: string | null;

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

  @OneToMany((type) => Article, (article) => article.user)
  articles: Article[];

  @OneToOne((type) => Profile, (profile) => profile.user)
  profile: Profile;
}
