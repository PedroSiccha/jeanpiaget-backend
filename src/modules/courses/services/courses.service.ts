import { Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async getAllCourses(): Promise<Course[]> {
    return this.coursesRepository.findAll();
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    // Aquí puedes agregar lógica adicional si es necesario, como validaciones, transformaciones de datos, etc.
    return this.coursesRepository.create(createCourseDto);
  }
}
