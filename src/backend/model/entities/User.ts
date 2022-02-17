import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './Comment';
import { Project } from './Project';
import { Interest } from './Interest';
import { Investment } from './Investment';
import { Like } from './Like';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    first_name: string;

    @Column("text")
    last_name: string;

    @Column("text")
    email: string;

    @Column("text")
    avatar: string;

    @Column("text")
    bio: string;

    @Column({type: "decimal", default: 0})
    investedAmt: number;

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(() => Project, project => project.user)
    projects: Project[];

    @OneToMany(() => Interest, interest => interest.user)
    interests: Interest[];

    @OneToMany(() => Investment, investment => investment.user)
    investments: Investment[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];
}