import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const MYSQL_OPTION: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [],
  synchronize: true,
  autoLoadEntities: true,
};
