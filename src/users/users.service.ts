import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../application/dtos/user/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async create(userDto: CreateUserDto): Promise<ApiResponse<User>> {
        try {
            //await validateOrReject(userDto);

            const existingEmail = await this.usersRepository.findOne({ where: { email: userDto.email } });
            if (existingEmail) {
                throw new ConflictException('El email ya está en uso.');
            }
            const existingPhone = await this.usersRepository.findOne({ where: { phone: userDto.phone } });
            if (existingPhone) {
                throw new ConflictException('El teléfono ya está en uso.');
            }
            const existingDni = await this.usersRepository.findOne({ where: { dni: userDto.dni } });
            if (existingDni) {
                throw new ConflictException('El dni ya está en uso.');
            }
            const newUser = this.usersRepository.create(userDto);
            const createdUser = await this.usersRepository.save(newUser);
            return { success: true, message: 'Usuario creado correctamente', data: createdUser,};
        } catch (error) {
            throw error;
        }
    }

}
