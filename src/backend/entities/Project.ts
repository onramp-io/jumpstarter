import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { Investment } from "./Investment";
import { Like } from "./Like";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text', array: true, nullable: true })
  pictures: string[];

  @Column("text")
  title: string;

  @Column("text")
  category: string;

  @Column("text")
  description: string;

  @Column("decimal", { array: true })
  fundTiers: number[];

  @Column({ type: "integer", default: 0})
  currFundGoal: number;

  @Column({ type: 'decimal', default: 0 })
  fundRaised: number;

  @Column({ type: 'decimal', default: 0 })
  fundRaisedLast: number;

  @Column('timestamp')
  launchDate: string;

  @Column({ type: 'timestamp', default: () => "now()" })
  createdDate: string;

  @Column({ type: "integer", default: 0 })
  likesAmt: number;

  @Column({ type: 'integer', default: 0 })
  likesAmtLast: number;

  @Column({ type: 'integer', default: 0 })
  views: number;

  @Column({ type: 'integer', default: 0 })
  viewsLast: number;

  @Column({ type: 'integer', default: 0 })
  trendScore: number;

  @Column({ type: 'timestamp', nullable: true})
  scoreUpdatedAt: string;

  @Column({ type: 'integer', default: 0 })
  investors: number;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Investment, (investment) => investment.project)
  investments: Investment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
