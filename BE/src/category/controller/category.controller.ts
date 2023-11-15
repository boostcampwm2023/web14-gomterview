import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from '../service/category.service';
import { Request } from 'express';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';
import { Member } from '../../member/entity/member';
import { AuthGuard } from '@nestjs/passport';
import { createApiResponseOption } from '../../util/swagger.util';
import { CategoryListResponse } from '../dto/categoryListResponse';
import { TokenService } from '../../token/service/token.service';
import { getTokenValue } from '../../util/token.util';

@Controller('/api/category')
@ApiTags('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private tokenService: TokenService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth() // 문서 상에 자물쇠 아이콘을 표시하여 쿠키가 필요하다는 것을 나타냄
  @ApiOperation({
    summary: '카테고리를 추가한다.',
  })
  @ApiBody({ type: CreateCategoryRequest })
  @ApiResponse(createApiResponseOption(201, '카테고리 추가', null))
  async createCategory(
    @Req() req: Request,
    @Body() createCategoryRequest: CreateCategoryRequest,
  ) {
    return await this.categoryService.createCategory(
      createCategoryRequest,
      req.user as Member,
    );
  }

  @Get()
  @ApiOperation({
    summary: '카테고리를 추가한다.',
  })
  @ApiResponse(
    createApiResponseOption(
      200,
      '사용중인 카테고리 조회 추가',
      CategoryListResponse,
    ),
  )
  async findCategories(@Req() req: Request) {
    const token = getTokenValue(req);
    const member = await this.tokenService.findMemberByToken(token);

    const categories = await this.categoryService.findUsingCategories(member);

    return CategoryListResponse.of(categories);
  }
}
