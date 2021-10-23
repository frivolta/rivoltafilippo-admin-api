import { CommonEntity } from 'src/common/entities/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Post' })
export class Post extends CommonEntity {
  @Column()
  content: string;

  @Column()
  img: string;

  @Column({ default: true })
  isDraft: boolean;
}
