import { IsBoolean, IsString } from "class-validator";

export class SearchCategoryDto {

    @IsString()
    name?: string;

    @IsString()
    description?: string;

    @IsBoolean()
    status: boolean;

}