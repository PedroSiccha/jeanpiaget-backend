import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRolDto } from 'src/application/dtos/roles/create-rol.dto';
import { Rol } from 'src/domain/entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor (
        @InjectRepository(Rol) private rolesRepository: Repository<Rol>
    ) {}

    async create(rol: CreateRolDto): Promise<ApiResponse<Rol>> {
        try {
            const newRol = this.rolesRepository.create(rol);
            const createRol = await this.rolesRepository.save(newRol);
            return { success: true, message: 'El rol fué creado correctamente', data: createRol}
        } catch (error) {
            throw error;
        }
    }
}
