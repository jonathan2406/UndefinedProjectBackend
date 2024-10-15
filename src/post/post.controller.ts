import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, Patch, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';  // Asegúrate de importar FileInterceptor
import { PostService } from './post.service';
import { CreatePostDto} from './dto/create-post.dto';
import { UpdatePostDto} from './dto/update-post.dto';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // 'file' es el nombre del campo que llevará el archivo
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File // Añadir el archivo subido al DTO
  ) {
    return this.postService.createPost(createPostDto, file); // Pasar el archivo al servicio
  }

  @Get()
  findAll() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
