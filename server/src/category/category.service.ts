import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  // создать категорию
  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isExist = await this.categoryRepository.findBy({
      user: { id: id },
      title: createCategoryDto.title,
    })

    if (isExist.length) throw new BadRequestException('Данная категория уже существует')

    const newCategory = {
      title: createCategoryDto.title,
      user: {
        id: id,
      },
    }

    return await this.categoryRepository.save(newCategory);
  }

  // найти все категории
  async findAll(id: number) {
    return await this.categoryRepository.find({
      where: {
        user: { id: id },
      },
      relations: {
        transactions: true,
      }
    })
  }

  // найти одну категорию
  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
        transactions: true,
      }
    })

    if (!category) throw new NotFoundException('Категории не существует')

    return category
  }

  // обновить категорию
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: id }
    })

    if (!category) throw new NotFoundException('Категории не существует')

    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  // удалить категорию
  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    })

    if (!category) throw new NotFoundException('Категории не существует')

    return await this.categoryRepository.delete(id);
  }
}
