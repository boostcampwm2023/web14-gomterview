import { Injectable } from '@nestjs/common';
import { WorkbookRepository } from '../repository/workbook.repository';
import { CreateWorkbookRequest } from '../dto/createWorkbookRequest';
import { CategoryRepository } from '../../category/repository/category.repository';
import { validateCategory } from '../../category/util/category.util';
import { Workbook } from '../entity/workbook';
import { Member } from '../../member/entity/member';
import { validateManipulatedToken } from '../../util/token.util';

@Injectable()
export class WorkbookService {
  constructor(
    private workbookRepository: WorkbookRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async createWorkbook(
    createWorkbookRequest: CreateWorkbookRequest,
    member: Member,
  ) {
    const category = await this.categoryRepository.findByCategoryId(
      createWorkbookRequest.categoryId,
    );
    validateManipulatedToken(member);
    validateCategory(category);

    return await this.workbookRepository.save(
      Workbook.of(
        createWorkbookRequest.name,
        createWorkbookRequest.content,
        category,
        member,
      ),
    );
  }
}
