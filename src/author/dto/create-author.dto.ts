import { OmitType } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';

export class CreateAuthorInput extends OmitType(Author, [
  'updatedAt',
  'id',
  'createdAt',
  'posts',
]) {}

export class CreateAuthorOutput {
  author: Author;
}
