import { ValidationPipe } from '@nestjs/common/pipes';
import {
  Controller,
  Get,
  Post, Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UsePipes
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  // создать категорию
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.create(createCategoryDto, +req.user.id);
  }

  // найти все категории
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.categoryService.findAll(+req.user.id);
  }

  // найти одну категорию
  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  // обновить категорию
  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  // удалить категорию
  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
