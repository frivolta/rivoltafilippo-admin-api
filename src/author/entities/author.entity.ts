import { IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity({ name: 'Author' })
export class Author extends CommonEntity {
  @IsString()
  @Column('varchar')
  name: string;

  @IsString()
  @Column('varchar')
  picture: string;

  @OneToMany(() => Post, (post: Post) => post.author)
  posts: Post[];
}
