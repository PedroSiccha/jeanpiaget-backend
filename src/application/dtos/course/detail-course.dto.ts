import { IsInt, IsNotEmpty } from "class-validator";

export class DetailsCourseDto {

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    courseId: number;

}