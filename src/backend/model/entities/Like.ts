import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Project } from './Project';

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.likes)
    user: User;

    @ManyToOne(() => Project, project => project.likes)
    project: Project;

}