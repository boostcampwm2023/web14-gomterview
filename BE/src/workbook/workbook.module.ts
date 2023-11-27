import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workbook } from './entity/workbook';
import { WorkbookRepository } from './repository/workbook.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Workbook])],
  providers: [WorkbookRepository],
})
export class WorkbookModule {}
