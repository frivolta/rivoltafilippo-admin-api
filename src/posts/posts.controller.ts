import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'finding all posts';
  }
}
