import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreatePostInput, CreatePostOutput } from './dto/create-post.dto';
import { PostService } from './posts.service';
import { GetAllPostsDto } from './dto/get-all-posts.dto';
import { GetPublicPostsDto } from './dto/get-public-posts.dto';
import { DeletePostInputDto, DeletePostOutputDto } from './dto/delete-post.dto';
import {
  GetPublicPostInputDto,
  GetPublicPostOutputDto,
} from './dto/get-all-post.dto';
import { UpdatePostInputDto, UpdatePostOutputDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPostInput: CreatePostInput): Promise<CreatePostOutput> {
    return this.postService.createPost(createPostInput);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllPosts(@Req() request: Request): Promise<GetAllPostsDto> {
    return this.postService.getAllPosts();
  }

  @Get('/public')
  getPublicPosts(@Req() request: Request): Promise<GetPublicPostsDto> {
    return this.postService.getPublicPosts();
  }

  @Get('/public/:id')
  getPublicPost(
    @Param() params: GetPublicPostInputDto,
    @Req() request: Request,
  ): Promise<GetPublicPostOutputDto> {
    return this.postService.getPublicPost(params);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  updatePost(
    @Param() params: string,
    @Req() request: UpdatePostInputDto,
  ): Promise<UpdatePostOutputDto> {
    return this.postService.updatePost(params, request);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deletePost(
    @Param() params: DeletePostInputDto,
    @Req() request: Request,
  ): Promise<DeletePostOutputDto> {
    return this.postService.deletePostDto(params);
  }
}
