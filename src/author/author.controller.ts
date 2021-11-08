import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAuthorInput, CreateAuthorOutput } from './dto/create-author.dto';

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

  // Get author

  // Delete author

  // Edit author
}
