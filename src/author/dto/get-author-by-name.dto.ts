import { PickType } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';

export class GetAuthorByNameInputDto {
  name: string;
}

export class GetAuthorByNameOutputDto {
  author: Author;
}
