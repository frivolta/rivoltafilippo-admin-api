import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
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

  @IsDate()
  @Column()
  publishedAt: Date;

  @IsString()
  @IsOptional()
  @Column()
  img: string;

  @IsBoolean()
  @Column({ default: true })
  isDraft: boolean;
}
