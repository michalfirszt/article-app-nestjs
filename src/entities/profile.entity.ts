import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Index,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @OneToOne((type) => User, (user) => user.profile, {
    createForeignKeyConstraints: false,
  })
  @Index('profile-user-unique', ['user_id'], { unique: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
