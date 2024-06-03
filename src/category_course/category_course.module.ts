import { Module } from '@nestjs/common';
import { CategoryCourseService } from './category_course.service';
import { CategoryCourseController } from './category_course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryCourse } from 'src/domain/entities/category-course.entity';
import { JwtStrategy } from 'src/application/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryCourse
    ]),
  ],
  providers: [CategoryCourseService, JwtStrategy],
  controllers: [CategoryCourseController]
})
export class CategoryCourseModule {}
