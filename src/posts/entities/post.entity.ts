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
  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column()
  slug: string;

  @IsString()
  @Column()
  content: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  mediumUrl: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  redditUrl: string;

  @IsDateString()
  @Column()
  publishedAt: Date;

  @IsString()
  @IsOptional()
  @Column()
  img: string;

  @IsBoolean()
  @IsOptional()
  @Column({ default: true, nullable: true })
  isDraft: boolean;
}
