import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSectionDto } from 'src/application/dtos/section/create-section.dto';
import { SearchSectionDto } from 'src/application/dtos/section/search-section.dto';
import { Course } from 'src/domain/entities/course.entity';
import { Section } from 'src/domain/entities/section.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {
    constructor (
        @InjectRepository(Section) private sectionRepository: Repository<Section>,
        @InjectRepository(Course) private courseRepository: Repository<Course>
    ) {}

    async create(section: CreateSectionDto): Promise<ApiResponse<Section>> {
        try {
            const courseExisting = await this.courseRepository.findOneBy({ id: section.courseId });
            if (!courseExisting) {
                throw new NotFoundException('El curso no existe');
            }
            const newSection = this.sectionRepository.create(section);
            const createSection = await this.sectionRepository.save(newSection);
            return { success: true, message: 'La sección se agregó correctamente', data: createSection };
        } catch (error) {
            throw error;
        }
    }

    async getByCourse(section: SearchSectionDto): Promise<ApiResponse<Section[]>> {
        try {
            /*
            const sections = await this.sectionRepository.find({
                where: { course: section.courseId }
            });
            */
            return { success: true, message: 'Lista de secciones'}
        } catch (error) {
            throw error;
        }
    }
}
