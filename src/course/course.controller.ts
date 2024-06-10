import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from 'src/application/dtos/course/create-course.dto';
import { HasRoles } from 'src/application/jwt/has-roles';
import { JwtRol } from 'src/application/jwt/jwt-rol';
import { JwtAuthGuard } from 'src/application/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/application/jwt/jwt-roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserSubscribeDto } from 'src/application/dtos/subscribe/user-subscribe.dto';
import { DetailsCourseDto } from 'src/application/dtos/course/detail-course.dto';

@Controller('v1/course')
export class CourseController {

    constructor (private coursesService: CourseService) {}

    @HasRoles(JwtRol.ADMIN, JwtRol.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('banner'))
    createCourse(
        @Body() course: CreateCourseDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ]
            })
        ) banner: Express.Multer.File
    ) {
        return this.coursesService.create(course, banner);
    }

    @HasRoles(JwtRol.ADMIN, JwtRol.INSTRUCTOR, JwtRol.STUDENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get()
    findAll() {
        return this.coursesService.getAll();
    }

    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post('subscribe')
    subscribe(
        @Body() dataSubscribe: UserSubscribeDto
    ) {
        return this.coursesService.subscribe(dataSubscribe);
    }

    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post('detail-course')
    getDetailsCourse(
        @Body() dataDetailsCourse: DetailsCourseDto
    ) {
        return this.coursesService.getDetailsCourse(dataDetailsCourse);
    }

}
