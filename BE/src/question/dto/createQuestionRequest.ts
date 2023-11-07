import {IsNotEmpty, IsString} from "@nestjs/class-validator";

export class CreateQuestionRequest {
    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}