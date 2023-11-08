import {ApiPropertyOptions} from "@nestjs/swagger/dist/decorators/api-property.decorator";
import {Type} from "@nestjs/common";

export const createPropertyOption = (example:unknown, description: string, type: Type): ApiPropertyOptions => {
    return {
        example : example,
        description: description,
        type: type,
    } as ApiPropertyOptions;
}