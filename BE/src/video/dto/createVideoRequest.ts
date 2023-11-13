import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVideoRequest {
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
