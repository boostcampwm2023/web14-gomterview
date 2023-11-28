import { Injectable } from '@nestjs/common';
import { WorkbookRepository } from '../repository/workbook.repository';
import { CreateWorkbookRequest } from '../dto/createWorkbookRequest';
import { CategoryRepository } from '../../category/repository/category.repository';
import { validateCategory } from '../../category/util/category.util';
import { Workbook } from '../entity/workbook';
import { Member } from '../../member/entity/member';
import { validateManipulatedToken } from '../../util/token.util';
import { WorkbookResponse } from '../dto/workbookResponse';
import { isEmpty } from 'class-validator';
import { validateWorkbook } from '../util/workbook.util';

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
        createWorkbookRequest.title,
        createWorkbookRequest.content,
        category,
        member,
      ),
    );
  }

  async findWorkbooks(categoryId: number) {
    if (isEmpty(categoryId)) {
      return await this.findAllWorkbook();
    }

    return this.findAllByCategory(categoryId);
  }

  private async findAllWorkbook() {
    const workbooks = await this.workbookRepository.findAll();
    return workbooks.map(WorkbookResponse.of);
  }

  private async findAllByCategory(categoryId: number) {
    const category = await this.categoryRepository.findByCategoryId(categoryId);
    validateCategory(category);

    const workbooks =
      await this.workbookRepository.findAllByCategoryId(categoryId);
    return workbooks.map(WorkbookResponse.of);
  }

  async findWorkbookTitles(member: Member) {
    if (isEmpty(member)) {
      return (await this.workbookRepository.findTop5Workbooks()).map(
        WorkbookResponse.of,
      );
    }

    return (await this.workbookRepository.findMembersWorkbooks(member.id)).map(
      WorkbookResponse.of,
    );
  }

  async findSingleWorkbook(workbookId: number) {
    const workbook = await this.workbookRepository.findById(workbookId);
    validateWorkbook(workbook);

    return WorkbookResponse.of(workbook);
  }
}
