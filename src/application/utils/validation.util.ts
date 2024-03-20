import { BadRequestException } from "@nestjs/common";
/*
export async function validateOrReject(object: any): Promise<void> {
    const errors: ValidationError[] = await validate(object);
    if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints)).join(', ');
        throw new BadRequestException(errorMessages);
    }
}
*/