import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthGuard } from '@nestjs/passport';
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
import { GetAllAuthorsDto } from './dto/get-authors.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createAuthorInput: CreateAuthorInput,
  ): Promise<CreateAuthorOutput> {
    return this.authorService.createAuthor(createAuthorInput);
  }

  // Get authors
  @Get('/:id')
  getAuthorById(
    @Param() getAuthorInput: GetAuthorInputDto,
  ): Promise<GetAuthorOutputDto> {
    return this.authorService.getAuthorById(getAuthorInput);
  }

  // Get authors
  @Get()
  getAllAuthors(): Promise<GetAllAuthorsDto> {
    return this.authorService.getAllAuthors();
  }

  // Get author
  @Get('/find/by-name/:name')
  getAuthorByName(
    @Param() getAuthorInput: GetAuthorByNameInputDto,
  ): Promise<GetAuthorOutputDto> {
    return this.authorService.getAuthorByName(getAuthorInput);
  }

  // Delete author
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteAuthor(
    @Param('id') deleteAuthorInput: DeleteAuthorInputDto,
  ): Promise<DeleteAuthorOutputDto> {
    return this.authorService.deleteAuthor(deleteAuthorInput);
  }

  // Update author
  @Put('/')
  @UseGuards(AuthGuard('jwt'))
  updateAuthor(
    @Body() updateAuthorInput: UpdateAuthorInputDto,
  ): Promise<UpdateAuthorOutputDto> {
    return this.authorService.updateAuthor(updateAuthorInput);
  }
}
