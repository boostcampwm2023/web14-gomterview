import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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
    createPropertyOption('https://video-example.com', '비디오 URL', String),
  )
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty(
    createPropertyOption(
      'https://thumb-example.com',
      '비디오 썸네일 URL',
      String,
    ),
  )
  @IsString()
  @IsOptional()
  thumbnail: string | null;

  @ApiProperty(createPropertyOption('03:29', '비디오 길이', String))
  @IsString()
  @IsNotEmpty()
  videoLength: string;

  constructor(
    questionId: number,
    videoName: string,
    url: string,
    thumbnail: string,
    videoLength: string,
  ) {
    this.questionId = questionId;
    this.videoName = videoName;
    this.url = url;
    this.thumbnail = thumbnail;
    this.videoLength = videoLength;
  }
}
