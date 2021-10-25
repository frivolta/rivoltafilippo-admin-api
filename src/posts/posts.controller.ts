import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreatePostInput, CreatePostOutput } from './dto/create-post.dto';
import { PostService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPostInput: CreatePostInput): any {
    return this.postService.createPost(createPostInput);
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'finding all posts';
  }
}
