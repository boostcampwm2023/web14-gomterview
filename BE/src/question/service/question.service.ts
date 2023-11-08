import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../repository/question.repository';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import { Member } from 'src/member/entity/member';
import { Question } from '../entity/question';
import { isEmpty } from 'class-validator';
import { isCategoryCustom } from '../util/question.util';
import {MemberRepository} from "../../member/repository/member.repository";

@Injectable()
export class QuestionService {
  constructor(private questionRepository: QuestionRepository, private memberRepository:MemberRepository) {}

  async createQuestion(
    createQuestionRequest: CreateQuestionRequest,
    member: Member,
  ) {
    const question = Question.from(createQuestionRequest, member);
    await this.questionRepository.save(question);
  }

  async findByCategory(category: string, memberId?: number) {
    if (isEmpty(memberId) && isCategoryCustom(category)) {
      throw new Error('400. 비회원은 나만의 질문을 DB에서 조회할 수 없습니다.');
    }

    const member = await this.memberRepository.findById(memberId);

    return await this.questionRepository.findAllByCategoryOrderByCreatedAtDesc(
      category,
      isEmpty(member) ? undefined : memberId,
    );
  }
}
