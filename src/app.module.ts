import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './application/jwt/jwt.constants';
import { RolesModule } from './roles/roles.module';
import { CategoryCourseModule } from './category_course/category_course.module';
import { CourseModule } from './course/course.module';
import { SectionModule } from './section/section.module';
import { IssueModule } from './issue/issue.module';
import { MediaModule } from './media/media.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    CategoryCourseModule,
    CourseModule,
    SectionModule,
    IssueModule,
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
