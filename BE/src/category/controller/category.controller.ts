import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../service/category.service';
import { createApiResponseOption } from '../../util/swagger.util';
import { CategoryListResponse } from '../dto/categoryListResponse';

@Controller('/api/category')
@ApiTags('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: '전체 카테고리를 조회한다.',
  })
  @ApiResponse(
    createApiResponseOption(
      200,
      '사용중인 카테고리 조회 추가',
      CategoryListResponse,
    ),
  )
  async findCategories() {
    const categories = await this.categoryService.findUsingCategories();
    return CategoryListResponse.of(categories);
  }
}
