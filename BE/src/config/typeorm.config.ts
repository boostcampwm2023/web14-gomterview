export const MYSQL_OPTION = {
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
