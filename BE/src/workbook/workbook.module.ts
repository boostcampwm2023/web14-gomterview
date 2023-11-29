import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workbook } from './entity/workbook';
import { WorkbookRepository } from './repository/workbook.repository';
import { WorkbookService } from './service/workbook.service';
import { WorkbookController } from './controller/workbook.controller';
import { Category } from '../category/entity/category';
import { CategoryRepository } from '../category/repository/category.repository';
import { CategoryModule } from '../category/category.module';
import { TokenSoftGuard } from '../token/guard/token.soft.guard';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workbook, Category]),
    CategoryModule,
    TokenModule,
  ],
  providers: [
    WorkbookRepository,
    WorkbookService,
    CategoryRepository,
    TokenSoftGuard,
  ],
  controllers: [WorkbookController],
})
export class WorkbookModule {}
