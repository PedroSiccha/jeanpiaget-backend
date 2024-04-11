import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../application/dtos/user/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('v1/users')
export class UsersController {

    constructor (private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Post()
    createUser(
        @Body() userDto: CreateUserDto
    ) {
        return this.usersService.create(userDto);
    }

}
