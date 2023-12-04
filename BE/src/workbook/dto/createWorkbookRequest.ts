import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsBoolean, IsNumber } from 'class-validator';

export class CreateWorkbookRequest {
  @ApiProperty(createPropertyOption('장희문제집', '문제집 이름', String))
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty(
    createPropertyOption('나만볼꺼다요 메롱', '문제집에 대한 설명', String),
  )
  @IsString()
  content: string;

  @ApiProperty(createPropertyOption(1, '카테고리 id', Number))
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty(createPropertyOption(true, '문제집 공개여부', Boolean))
  @IsBoolean()
  isPublic: boolean;

  constructor(
    title: string,
    content: string,
    categoryId: number,
    isPublic: boolean,
  ) {
    this.title = title;
    this.content = content;
    this.categoryId = categoryId;
    this.isPublic = isPublic;
  }
}
