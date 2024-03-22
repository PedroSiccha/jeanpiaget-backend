import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOrReject } from 'class-validator';
import { LoginAuthDto } from 'src/application/dtos/auth/login-auth.dto';
import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async register(userDto: CreateUserDto): Promise<ApiResponse<User>> {
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
            const createdUser = await this.usersRepository.save(newUser);
            return { success: true, message: 'Usuario creado correctamente', data: createdUser,};
        } catch (error) {
            throw error;
        }
    }

    async login(loginDto: LoginAuthDto): Promise<ApiResponse<User>> {
        try {

            const { email, password } = loginDto;
            const existingUser = await this.usersRepository.findOneBy({ email: email });
            if (!existingUser) {
                throw new NotFoundException('El usuario no existe.');
            }

            const isPasswordValid = await compare(password, existingUser.password);

            if (!isPasswordValid) {
                throw new ForbiddenException('La contraseña es incorrecta');
            }

            delete existingUser.password;
            const payload = {
                id: existingUser.id,
                name: existingUser.name
            }

            const token = this.jwtService.sign(payload);

            return { success: true, message: 'Bienvenido', data: existingUser, token: token};

        } catch(error) {
            throw error;
        }
    }

}
