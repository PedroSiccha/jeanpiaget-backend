import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from '../application/dtos/user/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/application/jwt/jwt-auth.guard';
import { UpdateUserDto } from '../application/dtos/user/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRolesGuard } from 'src/application/jwt/jwt-roles.guard';
import { HasRoles } from 'src/application/jwt/has-roles';
import { JwtRol } from 'src/application/jwt/jwt-rol';

@Controller('v1/users')
export class UsersController {

    constructor (private usersService: UsersService) {}

    @HasRoles(JwtRol.ADMIN, JwtRol.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
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

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number, 
        @Body()user: UpdateUserDto 
    ) {
        return this.usersService.update(id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateWithImage(
        @Param('id', ParseIntPipe) id: number,
        @Body() user: UpdateUserDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ]
            })
        ) file: Express.Multer.File
    ) {
        return this.usersService.updateWithImage(id, user, file);
    }

}
