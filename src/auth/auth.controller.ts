import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';

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

}
