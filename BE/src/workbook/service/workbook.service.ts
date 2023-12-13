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
import { validateWorkbook, validateWorkbookOwner } from '../util/workbook.util';
import { WorkbookTitleResponse } from '../dto/workbookTitleResponse';
import { UpdateWorkbookRequest } from '../dto/updateWorkbookRequest';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class WorkbookService {
  constructor(
    private workbookRepository: WorkbookRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  @Transactional()
  async createWorkbook(
    createWorkbookRequest: CreateWorkbookRequest,
    member: Member,
  ) {
    const category = await this.categoryRepository.findByCategoryId(
      createWorkbookRequest.categoryId,
    );
    validateManipulatedToken(member);
    validateCategory(category);

    const workbook = Workbook.of(
      createWorkbookRequest.title,
      createWorkbookRequest.content,
      category,
      member,
      createWorkbookRequest.isPublic,
    );
    const result = await this.workbookRepository.insert(workbook);
    return result.identifiers[0].id as number;
  }

  @Transactional()
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

  @Transactional()
  async findWorkbookTitles(member: Member) {
    const workbooks = await this.findWorkbookByMember(member);
    return workbooks.map(WorkbookTitleResponse.of);
  }

  private async findWorkbookByMember(member: Member) {
    if (isEmpty(member)) {
      return await this.workbookRepository.findTop5Workbooks();
    }

    return await this.workbookRepository.findMembersWorkbooks(member.id);
  }

  @Transactional()
  async findSingleWorkbook(workbookId: number) {
    const workbook = await this.workbookRepository.findById(workbookId);
    validateWorkbook(workbook);

    return WorkbookResponse.of(workbook);
  }

  @Transactional()
  async updateWorkbook(
    updateWorkbookRequest: UpdateWorkbookRequest,
    member: Member,
  ) {
    const category = await this.categoryRepository.findByCategoryId(
      updateWorkbookRequest.categoryId,
    );
    validateManipulatedToken(member);
    validateCategory(category);

    const workbook = await this.workbookRepository.findById(
      updateWorkbookRequest.workbookId,
    );

    validateWorkbook(workbook);
    validateWorkbookOwner(workbook, member);

    workbook.updateInfo(updateWorkbookRequest, category);
    await this.workbookRepository.update(workbook);
    return WorkbookResponse.of(workbook);
  }

  @Transactional()
  async deleteWorkbookById(workbookId: number, member: Member) {
    validateManipulatedToken(member);
    const workbook =
      await this.workbookRepository.findByIdWithoutJoin(workbookId);
    validateWorkbook(workbook);
    validateWorkbookOwner(workbook, member);
    await this.workbookRepository.remove(workbook);
  }
}
