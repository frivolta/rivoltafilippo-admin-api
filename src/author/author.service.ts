import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorInput, CreateAuthorOutput } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private readonly author: Repository<Author>,
  ) {}

  async createAuthor(
    createAuthorInput: CreateAuthorInput,
  ): Promise<CreateAuthorOutput> {
    try {
      const { name } = createAuthorInput;
      const authorByName = await this.author.findOne({ name });
      if (authorByName) {
        throw new HttpException(
          'Author name already exists',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      const newAuthor = this.author.create(createAuthorInput);
      await this.author.save(newAuthor);
      return { author: newAuthor };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
