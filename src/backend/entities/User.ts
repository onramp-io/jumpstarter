import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './Comment';
import { Project } from './Project';
import { Investment } from './Investment';
import { Like } from './Like';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  uid: String;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  email: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'text', array: true, nullable: true })
  interests: string[];

  @Column({ type: 'decimal', default: 0 })
  investedAmt: number;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Investment, (investment) => investment.user)
  investments: Investment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
