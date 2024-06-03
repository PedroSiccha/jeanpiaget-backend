import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/domain/entities/course.entity';
import { CategoryCourse } from 'src/domain/entities/category-course.entity';
import { CategoryCourseService } from '../category_course/category_course.service';
import { JwtStrategy } from 'src/application/jwt/jwt.strategy';
import { CourseRegistration } from 'src/domain/entities/course-registration.entity';
import { User } from 'src/domain/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course, CategoryCourse, CourseRegistration, User
    ]),
  ],
  providers: [CourseService, CategoryCourseService, JwtStrategy],
  controllers: [CourseController]
})
export class CourseModule {}
