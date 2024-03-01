import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
