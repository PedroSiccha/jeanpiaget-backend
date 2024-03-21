import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../application/dtos/user/create-user.dto';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {

    constructor (private usersService: UsersService) {}

    @Post()
    createUser(
        @Body() userDto: CreateUserDto
    ) {
        return this.usersService.create(userDto);
    }

}
