import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';
import { CommonEntity } from 'src/common/entities/common';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'Post' })
export class Post extends CommonEntity {
  @Column('varchar')
  title: string;

  @Column('varchar')
  slug: string;

  @Column('varchar')
  content: string;

  @Column({ type: 'varchar', nullable: true })
  mediumUrl: string;

  @Column({ type: 'varchar', nullable: true })
  redditUrl: string;

  @Column('date')
  publishedAt: Date;

  @Column('varchar')
  img: string;

  @Column({ type: 'boolean', default: true, nullable: true })
  isDraft: boolean;
}
