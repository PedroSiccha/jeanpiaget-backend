import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { JwtStrategy } from 'src/application/utils/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/application/utils/jwt.constants';

@Module({
  imports: [ 
      TypeOrmModule.forFeature([
      User
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule {}