import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {

    name?: String;

    lastname?: String;

    phone?: String;
    dni?: String;
    image?: String;
    notification_token?: String;
}