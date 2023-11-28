import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { Workbook } from '../entity/workbook';

export class WorkbookTitleResponse {
  @ApiProperty(createPropertyOption(1, '문제집 ID', Number))
  workbookId: number;
  @ApiProperty(
    createPropertyOption('이장희의 면접 문제집', '문제집 제목', String),
  )
  title: string;

  constructor(workbookId: number, title: string) {
    this.workbookId = workbookId;
    this.title = title;
  }

  static of(workbook: Workbook) {
    return new WorkbookTitleResponse(workbook.id, workbook.title);
  }
}
