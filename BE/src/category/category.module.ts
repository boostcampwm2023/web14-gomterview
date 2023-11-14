import { Module } from '@nestjs/common';
import { CategoryRepository } from './repository/category.repository';

@Module({
  providers: [CategoryRepository],
})
export class CategoryModule {}
