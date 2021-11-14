import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  isNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CommonEntity } from 'src/common/entities/common';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Author } from '../../author/entities/author.entity';

@Entity({ name: 'Post' })
export class Post extends CommonEntity {
  @IsString()
  @Column('varchar')
  title: string;

  @IsString()
  @Column('varchar')
  slug: string;

  @IsString()
  @Column('varchar')
  content: string;

  @IsString()
  @Column({ type: 'varchar' })
  excerpt: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  mediumUrl: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  redditUrl: string;

  @IsString()
  @Column('date')
  publishedAt: string;

  @IsString()
  @Column('varchar')
  img: string;

  @IsBoolean()
  @Column({ type: 'boolean', default: true, nullable: true })
  isDraft: boolean;

  @IsNotEmpty()
  @ManyToOne(() => Author, (author: Author) => author.posts)
  author: Author;
}
