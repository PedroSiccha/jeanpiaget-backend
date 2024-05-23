import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOrReject } from 'class-validator';
import { CreateCourseDto } from 'src/application/dtos/course/create-course.dto';
import { CategoryCourse } from 'src/domain/entities/category-course.entity';
import { Course } from 'src/domain/entities/course.entity';
import { Repository } from 'typeorm';
import storage = require ('../application/utils/cloud_storage');
import { CourseRegistration } from 'src/domain/entities/course-registration.entity';
import { UserSubscribeDto } from 'src/application/dtos/subscribe/user-subscribe.dto';
import { User } from 'src/domain/entities/user.entity';
import { DetailsCourseDto } from 'src/application/dtos/course/detail-course.dto';
import { DetailsCourseResponse } from 'src/domain/response/details-course.response';

@Injectable()
export class CourseService {

    constructor (
        @InjectRepository(Course) private courseRepository: Repository<Course>,
        @InjectRepository(CategoryCourse) private categoryRepository: Repository<CategoryCourse>,
        @InjectRepository(CourseRegistration) private subscriptionRepository: Repository<CourseRegistration>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async create(course: CreateCourseDto, banner: Express.Multer.File): Promise<ApiResponse<Course>> {
        try {
            const url = await storage(banner, banner.originalname);
            if (url === undefined && url === null) {
                throw new InternalServerErrorException('No se pudo guardar la imagen correctamente');
            }
            const categoryExisting = await this.categoryRepository.findOneBy({ id: course.categoryId });
            if (!categoryExisting) {
                throw new ConflictException('La categoría no existe');
            }
            const courseExisting = await this.courseRepository.findOneBy({ title: course.name });
            if (courseExisting) {
                throw new ConflictException('El curso ya existe');
            }
            course.banner = url;
            const newCourse = this.courseRepository.create(course);
            const createCourse = await this.courseRepository.save(newCourse);
            return { success: true, message: 'El curso fué creado correctamente', data: createCourse};
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<ApiResponse<Course[]>> {
        try {
            const courses = await this.courseRepository.createQueryBuilder('course').where('course.status = :status', { status: true }).limit(5).getMany();
            return { success: true, message: 'Lista de cursos', data: courses}
        } catch (error) {
            throw error;
        }
    }

    async getDetailsCourse(dataDetailsCourse: DetailsCourseDto): Promise<ApiResponse<DetailsCourseResponse>> {
        try {
            const activeCourses = await this.courseRepository.createQueryBuilder('course').where('course.id = :courseId', { courseId: dataDetailsCourse.courseId }).andWhere('course.status = :status', { status: true }).getOne();
            if (!activeCourses) {
                throw new ConflictException('El curso no está activo');
            }
            let isUserRegistered = await this.subscriptionRepository.createQueryBuilder('course_registration').where('course_registration.userId = :userId', { userId: dataDetailsCourse.userId }).andWhere('course_registration.courseId = :courseId', { courseId: dataDetailsCourse.courseId }).getOne();

            if (!isUserRegistered) {
                isUserRegistered = null;
            }

            const detailsCourse = {
                course: activeCourses,
                subscribe: isUserRegistered
            };
            
            return { success: true, message: 'Detalles del Curso ' + activeCourses.title, data: detailsCourse}

        } catch (error) {
            throw error;
        }

    }

    async subscribe(dataSubscribe: UserSubscribeDto): Promise<ApiResponse<Course>> {
        try {
            const activeCourses = await this.courseRepository.createQueryBuilder('course').where('course.id = :courseId', { courseId: dataSubscribe.courseId }).andWhere('course.status = :status', { status: true }).getOne();
            if (!activeCourses) {
                throw new ConflictException('El curso no está activo');
            }

            const isUserRegistered = await this.subscriptionRepository.createQueryBuilder('course_registration').where('course_registration.userId = :userId', { userId: dataSubscribe.userId }).andWhere('course_registration.courseId = :courseId', { courseId: dataSubscribe.courseId }).getOne();
            if (isUserRegistered) {
                throw new ConflictException('El usuario ya se encuentra registrado');
            }

            const user = await this.userRepository.findOneBy({ id: dataSubscribe.userId });
            if (!user) {
                throw new ConflictException('El usuario no existe');
            }

            const newRegistration = this.subscriptionRepository.create({
                user: user,
                course: activeCourses,
                dateRegistration: new Date(),
                status: true,
            });

            await this.subscriptionRepository.save(newRegistration);

            return { success: true, message: 'Usuario inscrito correctamente', data: activeCourses};
            
        } catch (error) {
            throw error;
        }
    }

}
