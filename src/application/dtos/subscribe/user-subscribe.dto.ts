import { IsBoolean, IsDate, IsNotEmpty } from "class-validator";

export class UserSubscribeDto {
    @IsNotEmpty()
    courseId: string;

    @IsNotEmpty()
    userId: number;

    @IsDate()
    dateRegistration: Date = new Date;

    @IsBoolean()
    status: boolean = true;
}