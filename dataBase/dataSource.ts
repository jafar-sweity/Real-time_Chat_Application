import 'typeorm';
import { DataSource } from 'typeorm/browser';


const dataSource = new DataSource ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [ ],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
  });