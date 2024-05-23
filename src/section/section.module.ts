import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from 'src/domain/entities/section.entity';
import { Course } from 'src/domain/entities/course.entity';
import { CourseService } from 'src/course/course.service';
import { JwtStrategy } from 'src/application/jwt/jwt.strategy';
import { CategoryCourse } from 'src/domain/entities/category-course.entity';
import { CourseRegistration } from 'src/domain/entities/course-registration.entity';
import { User } from 'src/domain/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Section, Course, CategoryCourse, CourseRegistration, User
    ]),
  ],
  providers: [SectionService, CourseService, JwtStrategy],
  controllers: [SectionController]
})
export class SectionModule {}
