import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workbook } from './entity/workbook';
import { WorkbookRepository } from './repository/workbook.repository';
import { WorkbookService } from './service/workbook.service';
import { WorkbookController } from './controller/workbook.controller';
import { Category } from '../category/entity/category';
import { CategoryRepository } from '../category/repository/category.repository';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Workbook, Category]), CategoryModule],
  providers: [WorkbookRepository, WorkbookService, CategoryRepository],
  controllers: [WorkbookController],
})
export class WorkbookModule {}
