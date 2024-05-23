import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryCourseDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsBoolean()
    status: boolean = true;

}