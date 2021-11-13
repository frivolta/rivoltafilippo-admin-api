import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorInput, CreateAuthorOutput } from './dto/create-author.dto';
import { GetAuthorInputDto, GetAuthorOutputDto } from './dto/get-author.dto';
import { GetAuthorByNameInputDto } from './dto/get-author-by-name.dto';
import {
  DeleteAuthorInputDto,
  DeleteAuthorOutputDto,
} from './dto/delete-author.dto';
import {
  UpdateAuthorInputDto,
  UpdateAuthorOutputDto,
} from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private readonly author: Repository<Author>,
  ) {}

  // It creates a new author
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

  // It returns an author by id
  async getAuthorById(
    getAuthorInput: GetAuthorInputDto,
  ): Promise<GetAuthorOutputDto> {
    try {
      const { id } = getAuthorInput;
      const author = await this.author.findOne({ id });
      if (!author) {
        throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
      }
      return { author };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  // Get authro by name
  async getAuthorByName(
    getAuthorInput: GetAuthorByNameInputDto,
  ): Promise<GetAuthorOutputDto> {
    try {
      const { name } = getAuthorInput;
      const author = await this.author.findOne({ name });
      if (!author) {
        throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
      }
      return { author };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  // Delete author by id
  async deleteAuthor(
    deleteAuthorInput: DeleteAuthorInputDto,
  ): Promise<DeleteAuthorOutputDto> {
    try {
      const { id } = deleteAuthorInput;
      const author = await this.author.delete({ id: +id });
      if (!author) {
        throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
      }
      await this.author.delete(id);
      return { ok: true };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  // Update author by id
  async updateAuthor(
    updateAuthorInput: UpdateAuthorInputDto,
  ): Promise<UpdateAuthorOutputDto> {
    try {
      const { id, name } = updateAuthorInput;
      const authorByName = await this.author.findOne({ name });
      if (authorByName) {
        throw new HttpException(
          'Author name already exists' + name,
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      await this.author.update(id, updateAuthorInput);
      const updatedAuthor = await this.author.findOne({ id });
      return updatedAuthor;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
