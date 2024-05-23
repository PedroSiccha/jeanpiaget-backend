import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/domain/entities/rol.entity';
import { User } from 'src/domain/entities/user.entity';
import { JwtStrategy } from 'src/application/jwt/jwt.strategy';

@Module({
  imports: [ TypeOrmModule.forFeature([ Rol, User ]) ],
  providers: [RolesService, JwtStrategy],
  controllers: [RolesController]
})
export class RolesModule {}
