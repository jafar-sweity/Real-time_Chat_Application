import 'typeorm';
import { DataSource } from 'typeorm';
import 'dotenv/config'
import { User } from './entities/User.js';
import { Permission } from './entities/Permission.js';
import { ChatRoom } from './entities/Chatroom.js';
import { Message } from './entities/Message.js';
import { UserBlock } from './entities/UserBlock.js';
import { UserMute } from './entities/UserMute.js';
import { UserRoles } from './entities/UserRoles.js';
import { Attachment } from './entities/Attachment.js';

// const dataSource = new DataSource ({
//     type: 'mysql',
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     username: process.env.DB_USER_NAME,
//     password:process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     synchronize: true,
//     logging: false,
//     entities: [User,ChatRoom,Message,Permission,UserBlock,UserMute,UserRoles],
    
//   })

const dataSource = new DataSource ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port : 3306,
  username:process.env.DB_USER_NAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME,
  synchronize:true,
  logging:true,

  entities: [User,ChatRoom,Message,Permission,UserBlock,UserMute,UserRoles,Attachment]
})


const initializeDB = async ()=>
    await dataSource.initialize().then(()=>{
        console.log('connected to db');
     }).catch((error)=>{
        console.log('error at connection : ');
        console.log(error);
        
     })

export default {initializeDB , dataSource};