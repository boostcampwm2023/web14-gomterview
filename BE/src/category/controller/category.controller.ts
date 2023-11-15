import { Body, Controller, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../service/category.service';

import { Request } from 'express';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';
import { Member } from '../../member/entity/member';

@Controller('/api/category')
@ApiTags('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async createCategory(
    @Req() req: Request,
    @Body() createCategoryRequest: CreateCategoryRequest,
  ) {
    return await this.categoryService.createCategory(
      createCategoryRequest,
      req.user as Member,
    );
  }
}
