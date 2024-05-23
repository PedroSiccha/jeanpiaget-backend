import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryCourseDto } from 'src/application/dtos/category_course/create-category-course.dto';
import { CategoryCourse } from 'src/domain/entities/category-course.entity';
import { Repository } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { SearchCategoryDto } from 'src/application/dtos/category_course/search-category.dto';

@Injectable()
export class CategoryCourseService {
    constructor (
        @InjectRepository(CategoryCourse) private categoryCourseRepository: Repository<CategoryCourse>
    ) {}

    async create(categoryCourse: CreateCategoryCourseDto): Promise<ApiResponse<CategoryCourse>> {
        try {
            await validateOrReject(categoryCourse);
            const categoryExisting = await this.categoryCourseRepository.findOneBy({ name: categoryCourse.name });
            if (categoryExisting) {
                throw new ConflictException('La categoría ya existe');
            }
            const newCategory = this.categoryCourseRepository.create(categoryCourse);
            const createCategory = await this.categoryCourseRepository.save(newCategory);
            return { success: true, message: 'La categoría se creó correctamente', data: createCategory};

        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<ApiResponse<CategoryCourse[]>> {
        try {
            const categories = await this.categoryCourseRepository.find();
            return { success: true, message: 'Lista de categorías', data: categories }
        } catch (error) {
            throw error;
        }
    }

    async findByStatus(category: SearchCategoryDto): Promise<ApiResponse<CategoryCourse[]>> {
        try {
            const categories = await this.categoryCourseRepository.find({
                where: { status: category.status }
            });
            return { success: true, message: 'Lista de categorías habilitadas', data: categories }
        } catch (error) {
            throw error;
        }
    }

}
