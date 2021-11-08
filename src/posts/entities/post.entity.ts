import {
  IsBoolean,
  IsDate,
  IsDateString,
  isNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CommonEntity } from 'src/common/entities/common';
import { Entity, Column } from 'typeorm';

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
}
