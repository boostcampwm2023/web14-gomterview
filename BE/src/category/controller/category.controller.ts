import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../service/category.service';
import { createApiResponseOption } from '../../util/swagger.util';
import { CategoryResponse } from '../dto/categoryResponse';

@Controller('/api/category')
@ApiTags('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: '전체 카테고리를 조회한다.',
  })
  @ApiResponse(
    createApiResponseOption(200, '사용중인 카테고리 조회 추가', [
      CategoryResponse,
    ]),
  )
  async findCategories() {
    return await this.categoryService.findUsingCategories();
  }
}
