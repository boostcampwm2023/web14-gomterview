import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { Workbook } from '../entity/workbook';

export class WorkbookIdResponse {
  @ApiProperty(createPropertyOption(1, '답변 ID', Number))
  workbookId: number;

  constructor(workbookId: number) {
    this.workbookId = workbookId;
  }

  static of(workbook: Workbook) {
    return new WorkbookIdResponse(workbook.id);
  }
}
