import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOrReject } from 'class-validator';
import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async register(userDto: CreateUserDto): Promise<ApiResponse<User>> {
        try {
            await validateOrReject(userDto);
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
