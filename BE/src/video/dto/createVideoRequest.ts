import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { createPropertyOption } from 'src/util/swagger.util';

export class CreateVideoRequest {
  @ApiProperty(createPropertyOption(1, '문제 ID', Number))
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty(createPropertyOption('example.mp4', '비디오 파일 이름', String))
  @IsString()
  @IsNotEmpty()
  videoName: string;

  @ApiProperty(
    createPropertyOption('https://example.com', '비디오 URL', String),
  )
  @IsString()
  @IsNotEmpty()
  url: string;
}
