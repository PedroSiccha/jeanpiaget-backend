// #region IMPORT
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from '../application/dtos/user/create-user.dto';
import { validateOrReject } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/application/dtos/user/update-user.dto';
import storage = require ('../application/utils/cloud_storage');
import { Rol } from 'src/domain/entities/rol.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService,
        @InjectRepository(Rol) private rolesRepository: Repository<Rol>
    ) {}
// #region CREATE
    async create(userDto: CreateUserDto): Promise<ApiResponse<User>> {
        try {
            await validateOrReject(userDto);

            const existingEmail = await this.usersRepository.findOneBy({ email: userDto.email });
            if (existingEmail) {
                throw new ConflictException('El email ya está en uso.');
            }
            const existingPhone = await this.usersRepository.findOneBy({ phone: userDto.phone });
            if (existingPhone) {
                throw new ConflictException('El teléfono ya está en uso.');
            }
            const existingDni = await this.usersRepository.findOneBy({ dni: userDto.dni });
            if (existingDni) {
                throw new ConflictException('El dni ya está en uso.');
            }
            const newUser = this.usersRepository.create(userDto);
            let rolesIds = [];
            if (userDto.rolesIds !== undefined && userDto.rolesIds !== null) {
                rolesIds = userDto.rolesIds;
            } else {
                rolesIds.push('STUDENT');
            }
            
            const roles = await this.rolesRepository.findBy({ id: In(rolesIds) });
            newUser.roles = roles;
            const createdUser = await this.usersRepository.save(newUser);
            const payload = {
                id: createdUser.id,
                name: createdUser.name
            }

            const token = this.jwtService.sign(payload);

            return { success: true, message: 'Usuario creado correctamente', data: createdUser, token: 'Bearer ' + token};
        } catch (error) {
            throw error;
        }
    }
// #region FINDALL
    async findAll(): Promise<ApiResponse<User[]>> {
        try {
            const users = await this.usersRepository.find({ relations: ['roles'] });
            return { success: true, message: 'Todos los usuarios', data: users};
        } catch (error) {
            throw error;
        }
    }
// #region UPDATE
    async update(id: number, user: UpdateUserDto): Promise<ApiResponse<User>> {
        try {
            const userFound = await this.usersRepository.findOneBy({ id: id });
            if (!userFound) {
                throw new NotFoundException('El usuario no existe');
            }
            const updatedUser = Object.assign(userFound, user);
            const update = await this.usersRepository.save(updatedUser);
            delete update.password;
            return { success: true, message: 'Usuario actualizado correctamente', data: update, };
        } catch (error) {
            throw error;
        }
    }
//#region UPDATEWITHIMAGE
    async updateWithImage(id: number, user: UpdateUserDto, image: Express.Multer.File): Promise<ApiResponse<User>> {
        try {

            console.log("Image ", image);
            if (image === undefined && image !== null) {
                this.update(id, user);
            } else {
                const url = await storage(image, image.originalname);
                if (url === undefined && url === null) {
                    throw new InternalServerErrorException('No se pudo guardar la imagen correctamente');
                }
    
                const userFound = await this.usersRepository.findOneBy({ id: id });
                if (!userFound) {
                    throw new NotFoundException('El usuario no existe');
                }
                user.image = url;
                const updatedUser = Object.assign(userFound, user);
                const update = await this.usersRepository.save(updatedUser);
                delete update.password;
                
                return { success: true, message: 'Usuario actualizado correctamente', data: userFound, }
            }

        } catch (error) {
            throw error;
        }
    }

}
