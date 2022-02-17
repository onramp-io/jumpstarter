import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Interest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  interest: string;

  @ManyToOne(() => User, (user) => user.interests)
  user: User;
}
