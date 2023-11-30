import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
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
    createPropertyOption(
      'https://u2e0.c18.e2-4.dev/videos/example.mp4',
      '비디오 URL',
      String,
    ),
  )
  @IsString()
  @IsNotEmpty()
  @Matches(/^https:\/\/u2e0\.c18\.e2-4\.dev\/videos/, {
    message: '비디오 URL 형식이 올바르지 않습니다.',
  })
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
  @Matches(/^\d{2}:\d{2}$/, {
    message: `유효하지 않은 비디오 길이 형태입니다. "mm:ss" 형태로 요청해주세요.`,
  })
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
