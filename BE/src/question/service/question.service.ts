import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QuestionRepository } from '../repository/question.repository';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import { Member } from 'src/member/entity/member';
import { Question } from '../entity/question';
import { isEmpty } from 'class-validator';
import { isCategoryCustom, OUTPUT_FORM } from '../util/question.util';
import { MemberRepository } from '../../member/repository/member.repository';
import { QuestionListResponse } from '../dto/questionListResponse';
import { CustomQuestionRequest } from '../dto/customQuestionRequest';
import { ContentEmptyException } from '../exception/question.exception';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private memberRepository: MemberRepository,
  ) {}

  // async createQuestion(
  //   createQuestionRequest: CreateQuestionRequest,
  //   member: Member,
  // ) {
  //   const question = Question.from(createQuestionRequest, member);
  //   await this.questionRepository.save(question);
  // }

  async createCustomQuestion(
    customQuestionRequest: CustomQuestionRequest,
    member: Member,
  ) {
    if (isEmpty(customQuestionRequest.content)) {
      throw new ContentEmptyException();
    }

    const questionRequest = {
      category: 'CUSTOM',
      content: customQuestionRequest.content,
    } as CreateQuestionRequest;
    const question = Question.from(questionRequest, member);
    await this.questionRepository.save(question);
  }

  async findCategories() {
    const categories = (await this.questionRepository.findCategories()).map(
        (categoryOnDB) => OUTPUT_FORM[categoryOnDB],
    );
    categories.sort();
    return categories;
  }

  async findByCategory(category: string, memberId?: number) {
    if (isEmpty(memberId) && isCategoryCustom(category)) {
      throw new UnauthorizedException();
    }

    const member = await this.memberRepository.findById(memberId);
    const questionList =
      await this.questionRepository.findAllByCategoryOrderByCreatedAtDesc(
        category,
        isEmpty(member) ? undefined : memberId,
      );

    return QuestionListResponse.from(questionList);
  }

  async deleteById(id: number, member: Member) {
    const question = await this.questionRepository.findQuestionByIdAndMember_Id(
      id,
      member.id,
    );

    if (isEmpty(question)) {
      throw new UnauthorizedException();
    }

    await this.questionRepository.remove(question);
  }
}
