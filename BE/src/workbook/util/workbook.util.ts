import { Workbook } from '../entity/workbook';
import { isEmpty } from 'class-validator';
import { WorkbookNotFoundException } from '../exception/workbook.exception';
import { UnauthorizedException } from '@nestjs/common';
import { Member } from '../../member/entity/member';

export const validateWorkbook = (workbook: Workbook) => {
  if (isEmpty(workbook)) throw new WorkbookNotFoundException();
};

export const validateWorkbookOwner = (workbook: Workbook, member: Member) => {
  if (!workbook.isOwnedBy(member)) {
    throw new UnauthorizedException();
  }
};
