import { PartialType } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';

export class UpdatePostInputDto extends PartialType(Post) {}

export type UpdatePostOutputDto = Post;
