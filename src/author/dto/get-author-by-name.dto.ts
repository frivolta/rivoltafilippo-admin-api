import { PickType } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';

export class GetAuthorByNameInputDto extends PickType(Author, ['name']) {}

export class GetAuthorByNameOutputDto {
  author: Author;
}
