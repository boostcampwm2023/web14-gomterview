import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CustomQuestionRequest {
  @ApiProperty({
    example: '개발자가 되기 좋은 역량은 무엇일까요?',
    description: 'content',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
