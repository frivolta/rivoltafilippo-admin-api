import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostInput, CreatePostOutput } from './dto/create-post.dto';
import { PostService } from './posts.service';
import { GetAllPostsDto } from './dto/get-all-posts.dto';
import { GetPublicPostsDto } from './dto/get-public-posts.dto';
import { DeletePostInputDto, DeletePostOutputDto } from './dto/delete-post.dto';
import {
  GetPublicPostInputDto,
  GetPublicPostOutputDto,
} from './dto/get-public-post.dto';
import { UpdatePostInputDto, UpdatePostOutputDto } from './dto/update-post.dto';
import { GetPostInputDto, GetPostOutputDto } from './dto/get-post.dto';
import {
  GetPostInputBySlugDto,
  GetPostOutputBySlugDto,
} from './dto/get-post-by-slug.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  // Create Post
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPostInput: CreatePostInput): Promise<CreatePostOutput> {
    return this.postService.createPost(createPostInput);
  }

  // Get Posts
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllPosts(): Promise<GetAllPostsDto> {
    return this.postService.getAllPosts();
  }

  @Get('/id/:id')
  @UseGuards(AuthGuard('jwt'))
  getPost(@Param() params: GetPostInputDto): Promise<GetPostOutputDto> {
    return this.postService.getPost(params);
  }

  @Get('/slug/:slug')
  getPublicPostBySlug(
    @Param() getPostInputBySlugDto: GetPostInputBySlugDto,
  ): Promise<GetPostOutputBySlugDto> {
    return this.postService.getPostBySlug(getPostInputBySlugDto);
  }

  // Edit Post
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  updatePost(
    @Param() params: string,
    @Body() updatePostInput: UpdatePostInputDto,
  ): Promise<UpdatePostOutputDto> {
    return this.postService.updatePost(params, updatePostInput);
  }

  // Delte Posts
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deletePost(
    @Param() params: DeletePostInputDto,
  ): Promise<DeletePostOutputDto> {
    return this.postService.deletePostDto(params);
  }

  // Public - Get Posts
  @Get('/public/all')
  getPublicPosts(): Promise<GetPublicPostsDto> {
    return this.postService.getPublicPosts();
  }

  // Public - Get Post
  @Get('/public/:id')
  getPublicPost(
    @Param() params: GetPublicPostInputDto,
  ): Promise<GetPublicPostOutputDto> {
    return this.postService.getPublicPost(params);
  }
}
