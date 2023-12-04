import { Workbook } from '../entity/workbook';
import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { isEmpty } from 'class-validator';

export class WorkbookResponse {
  @ApiProperty(createPropertyOption(1, '문제집 ID', Number))
  workbookId: number;

  @ApiProperty(createPropertyOption(1, '카테고리 ID', Number))
  categoryId: number;

  @ApiProperty(createPropertyOption('이장희', '회원 닉네임', String))
  nickname: string;

  @ApiProperty(
    createPropertyOption(
      'https://jangsarchive.tistory.com',
      '회원 프로필 사진 주소',
      String,
    ),
  )
  profileImg: string;

  @ApiProperty(createPropertyOption(1, '문제집 복사 횟수', Number))
  copyCount: number;

  @ApiProperty(
    createPropertyOption('이장희의 면접 문제집', '문제집 제목', String),
  )
  title: string;

  @ApiProperty(createPropertyOption('내꺼 건들 ㄴㄴ해', '문제집 설명', String))
  content: string;

  @ApiProperty(createPropertyOption(true, '문제집 공개여부', Boolean))
  isPublic: boolean;

  constructor(
    workbookId: number,
    categoryId: number,
    nickname: string,
    profileImg: string,
    copyCount: number,
    title: string,
    content: string,
    isPublic: boolean,
  ) {
    this.workbookId = workbookId;
    this.categoryId = categoryId;
    this.nickname = nickname;
    this.profileImg = profileImg;
    this.copyCount = copyCount;
    this.title = title;
    this.content = isEmpty(content) ? '' : content.toString();
    this.isPublic = isPublic;
  }

  static of(workbook: Workbook) {
    const member = workbook.member;
    return new WorkbookResponse(
      workbook.id,
      workbook.category.id,
      member.nickname,
      member.profileImg,
      workbook.copyCount,
      workbook.title,
      workbook.content,
      workbook.isPublic,
    );
  }
}
