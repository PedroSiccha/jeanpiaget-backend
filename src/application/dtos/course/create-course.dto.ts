import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateCourseDto {

    //@IsNotEmpty()
    //@IsString()
    name: string;

    //@IsNotEmpty()
    //@IsString()
    description: string;

    //@IsString()
    banner: string;

    //@IsNotEmpty()
    //@IsBoolean()
    status: boolean;

    //@IsNotEmpty()
    //@IsDecimal({ decimal_digits: '2' })
    //@Min(0, { message: 'El precio del curso debe ser mayor o igual a 0.' })
    price: number;

    //@IsNotEmpty()
    //@IsInt()
    categoryId: number;
}