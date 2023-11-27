import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QuestionRepository } from '../repository/question.repository';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import { isEmpty } from 'class-validator';
import { Question } from '../entity/question';
import { QuestionResponse } from '../dto/questionResponse';
import { Member } from '../../member/entity/member';
import { NeedToFindByWorkbookIdException } from '../exception/question.exception';
import { validateManipulatedToken } from '../../util/token.util';
import { validateQuestion } from '../util/question.util';
import { WorkbookRepository } from '../../workbook/repository/workbook.repository';
import {
  validateWorkbook,
  validateWorkbookOwner,
} from '../../workbook/workbook.util';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private workbookRepository: WorkbookRepository,
  ) {}

  async createQuestion(
    createQuestionRequest: CreateQuestionRequest,
    member: Member,
  ) {
    const workbook = await this.workbookRepository.findById(
      createQuestionRequest.categoryId,
    );

    validateWorkbook(workbook);

    if (!workbook.isOwnedBy(member)) {
      throw new UnauthorizedException();
    }

    const question = await this.questionRepository.save(
      Question.of(workbook, null, createQuestionRequest.content),
    );

    return QuestionResponse.from(question);
  }

  async findAllByWorkbookId(workbookId: number) {
    if (isEmpty(workbookId)) {
      throw new NeedToFindByWorkbookIdException();
    }

    const questions =
      await this.questionRepository.findByWorkbookId(workbookId);
    return questions.map(QuestionResponse.from);
  }

  async deleteQuestionById(questionId: number, member: Member) {
    validateManipulatedToken(member);
    const question = await this.questionRepository.findById(questionId);
    validateQuestion(question);
    await this.validateMembersWorkbookById(question.workbook.id, member);
    await this.questionRepository.remove(question);
  }

  private async validateMembersWorkbookById(
    workbookId: number,
    member: Member,
  ) {
    const workbook = await this.workbookRepository.findById(workbookId);
    validateWorkbook(workbook);
    validateWorkbookOwner(workbook, member);
  }
}
