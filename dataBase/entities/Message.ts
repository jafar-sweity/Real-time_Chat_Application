import {
    BaseEntity,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinTable,
    ManyToMany
} from "typeorm";

import { User } from "./User.js";
import { ChatRoom } from "./Chatroom.js";

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    MessageID: number

    @Column()
    SenderUserId: string;

    @Column({ nullable: false })
    Content: string;

    @CreateDateColumn({ type: 'timestamp'})
    Timestamp: Date ;

    @Column()
    ChatRoomID: number

    @Column('blob',{ nullable: true })
    Attachment: Buffer

   


   
}