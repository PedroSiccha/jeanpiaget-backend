import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';
import { LoginAuthDto } from 'src/application/dtos/auth/login-auth.dto';

@Controller('v1/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('register')
    register(
        @Body() userDto: CreateUserDto
    ) {
        return this.authService.register(userDto);
    }

    @Post('login')
    login(
        @Body() loginDto: LoginAuthDto
    ) {
        return this.authService.login(loginDto);
    }

}
