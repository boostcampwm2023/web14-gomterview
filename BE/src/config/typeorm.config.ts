import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Member } from 'src/member/entity/member';
import 'dotenv/config';

export const MYSQL_OPTION: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [Member],
  synchronize: true,
  autoLoadEntities: true,
};
