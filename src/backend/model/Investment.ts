import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Project } from './Project';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  fund_amt: number;

  @ManyToOne(() => User, (user) => user.investments)
  user: User;

  @ManyToOne(() => Project, (project) => project.investments)
  project: Project;
}
