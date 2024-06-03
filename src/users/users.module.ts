import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { JwtStrategy } from 'src/application/jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/application/jwt/jwt.constants';
import { Rol } from 'src/domain/entities/rol.entity';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [ 
      TypeOrmModule.forFeature([
      User,
      Rol
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [UsersService, RolesService, JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule {}