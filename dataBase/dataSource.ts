import 'typeorm';
import { DataSource } from 'typeorm/browser';


const dataSource = new DataSource ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    migrations: [],
    synchronize: true,
    logging: false
  });

const initializeDB = async ()=>
    await dataSource.initialize().then(()=>{
        console.log('connected to db');
     }).catch((error)=>{
        console.log('error at connection : ');
        console.log(error);
        
     })

export default {initializeDB , dataSource};