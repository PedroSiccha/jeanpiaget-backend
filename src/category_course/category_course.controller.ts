import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryCourseService } from './category_course.service';
import { HasRoles } from 'src/application/jwt/has-roles';
import { JwtRol } from 'src/application/jwt/jwt-rol';
import { JwtAuthGuard } from 'src/application/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/application/jwt/jwt-roles.guard';
import { CreateCategoryCourseDto } from 'src/application/dtos/category_course/create-category-course.dto';
import { SearchCategoryDto } from 'src/application/dtos/category_course/search-category.dto';

@Controller('v1/category-course')
export class CategoryCourseController {
    constructor (private categoryService: CategoryCourseService) {}

    @HasRoles(JwtRol.ADMIN, JwtRol.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post()
    createCategory(
        @Body() categoryDto: CreateCategoryCourseDto
    ) {
        return this.categoryService.create(categoryDto);
    }

    @HasRoles(JwtRol.ADMIN, JwtRol.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('by-status')
    findByStatus(
        @Body() categoryDto: SearchCategoryDto
    ) {
        return this.categoryService.findByStatus(categoryDto);
    }

}
