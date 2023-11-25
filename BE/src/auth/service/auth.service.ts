import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/member/repository/member.repository';
import { OAuthRequest } from '../interface/auth.interface';
import { Member } from 'src/member/entity/member';
import { isEmpty } from 'class-validator';
import { TokenService } from '../../token/service/token.service';
import { CategoryRepository } from '../../category/repository/category.repository';
import { QuestionRepository } from '../../question/repository/question.repository';
import { Category } from '../../category/entity/category';
import { Question } from '../../question/entity/question';
import { BEARER_PREFIX } from 'src/constant/constant';

@Injectable()
export class AuthService {
  constructor(
    private memberRepository: MemberRepository,
    private tokenService: TokenService,
    private categoryRepository: CategoryRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async login(oauthRequest: OAuthRequest) {
    let member = await this.memberRepository.findByEmail(oauthRequest.email);

    if (isEmpty(member)) {
      member = await this.createMember(oauthRequest);
    }

    return BEARER_PREFIX + (await this.tokenService.assignToken(member.id));
  }

  async logout(accessToken: string) {
    await this.tokenService.removeToken(accessToken);
  }

  async reissue(accessToken: string) {
    return BEARER_PREFIX + (await this.tokenService.reissue(accessToken));
  }

  private async createMember(oauthRequest: OAuthRequest) {
    let member = new Member(
      undefined,
      oauthRequest.email,
      oauthRequest.name,
      oauthRequest.img,
      new Date(),
    );
    member = await this.memberRepository.save(member);
    await this.createCopy(member);
    return member;
  }

  private async createCopy(member) {
    (await this.categoryRepository.findAllByMemberId(null)).forEach(
      async (category) => {
        const newCategory = await this.categoryRepository.save(
          Category.from(category, member),
        );
        await this.createCopyQuestion(category, newCategory);
      },
    );
  }

  private async createCopyQuestion(category: Category, newCategory: Category) {
    const questions = await this.questionRepository.findByCategoryId(
      category.id,
    );

    questions.forEach(async (question) => {
      await this.questionRepository.save(
        Question.copyOf(question, newCategory),
      );
    });
  }
}
