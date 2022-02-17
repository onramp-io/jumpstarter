import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { Investment } from './Investment';
import { Like } from './Like';

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text", { array: true})
    pictures: string[];

    @Column("text")
    title: string;

    @Column("text")
    category: string;

    @Column("text")
    description: string;

    @Column("decimal", { array: true})
    fund_tiers: number[];

    @Column("integer")
    currFundGoal: number;

    @Column("decimal")
    fundRaised: number;

    @Column("timestamp")
    launchDate: string;

    @Column("timestamp")
    createdDate: string;

    @Column("integer")
    likesAmt: number;

    @ManyToOne(() => User, user => user.projects)
    user: User;

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(() => Investment, investment => investment.project)
    investments: Investment[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];
}