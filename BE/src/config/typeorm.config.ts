import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { Member } from '../member/entity/member';
import { Category } from '../category/entity/category';
import { Workbook } from '../workbook/entity/workbook';
import { Question } from '../question/entity/question';
import { Answer } from '../answer/entity/answer';
import { Video } from '../video/entity/video';

export const MYSQL_OPTION: TypeOrmModuleAsyncOptions = {
  useFactory() {
    return {
      type: 'mysql',
      name: 'main',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      entities: [Member, Category, Workbook, Question, Answer, Video],
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    };
  },
  async dataSourceFactory(options) {
    if (!options) {
      throw new Error('Invalid options passed');
    }

    return addTransactionalDataSource(new DataSource(options));
  },
};
