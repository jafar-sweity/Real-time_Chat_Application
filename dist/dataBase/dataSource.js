import 'typeorm';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from './entities/User.js';
import { Permission } from './entities/Permission.js';
import { ChatRoom } from './entities/Chatroom.js';
import { Message } from './entities/Message.js';
import { UserBlock } from './entities/UserBlock.js';
import { UserMute } from './entities/UserMute.js';
import { UserRoles } from './entities/UserRoles.js';
const dataSource = new DataSource({
    type: 'mysql',
    host: 'final-project.ccft9dbis2c2.eu-west-2.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: '12345678',
    database: 'final_project',
    synchronize: true,
    logging: false,
    entities: [User, ChatRoom, Message, Permission, UserBlock, UserMute, UserRoles],
});
const initializeDB = async () => await dataSource.initialize().then(() => {
    console.log('connected to db');
}).catch((error) => {
    console.log('error at connection : ');
    console.log(error);
});
export default { initializeDB, dataSource };
//# sourceMappingURL=dataSource.js.map