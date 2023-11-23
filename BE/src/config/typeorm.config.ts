import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const MYSQL_OPTION: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  autoLoadEntities: true,
};
