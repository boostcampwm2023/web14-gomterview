import { Module } from '@nestjs/common';
import { CategoryRepository } from './repository/category.repository';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';

@Module({
  providers: [CategoryRepository, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
