import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from 'src/application/dtos/roles/create-rol.dto';
import { HasRoles } from 'src/application/jwt/has-roles';
import { JwtRol } from 'src/application/jwt/jwt-rol';
import { JwtAuthGuard } from 'src/application/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/application/jwt/jwt-roles.guard';

@Controller('v1/roles')
export class RolesController {
    constructor (
        private rolesService: RolesService
    ) {}

    @HasRoles(JwtRol.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post()
    create(
        @Body() rol: CreateRolDto
    ) {
        return this.rolesService.create(rol);
    }

}
