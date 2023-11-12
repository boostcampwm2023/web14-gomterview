import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CustomQuestionRequest {
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
