import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Project } from './Project';

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    comment: string;

    @ManyToOne(() => User, user => user.comments)
    user: User;

    @ManyToOne(() => Project, project => project.comments)
    project: Project;

}