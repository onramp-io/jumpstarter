import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  category: string;

  @Column('text')
  picture: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
