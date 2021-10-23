import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: true })
  isActive: boolean;
}
