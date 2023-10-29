import 'typeorm';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from './entities/User.js';
import { ChatRoom } from './entities/Chatroom.js';
import { Message } from './entities/Message.js';
import { UserBlock } from './entities/UserBlock.js';
import { UserMute } from './entities/UserMute.js';
import { Attachment } from './entities/Attachment.js';
const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, ChatRoom, Message, UserBlock, UserMute, Attachment]
});
const initializeDB = async () => await dataSource.initialize().then(() => {
    console.log('connected to db');
}).catch((error) => {
    console.log('error at connection : ');
    console.log(error);
});
export default { initializeDB, dataSource };
//# sourceMappingURL=dataSource.js.map