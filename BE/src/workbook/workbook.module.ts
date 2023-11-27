import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workbook } from './entity/workbook';
import { WorkbookRepository } from './repository/workbook.repository';
import { WorkbookService } from './service/workbook.service';
import { WorkbookController } from './controller/workbook.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Workbook])],
  providers: [WorkbookRepository, WorkbookService],
  controllers: [WorkbookController],
})
export class WorkbookModule {}
