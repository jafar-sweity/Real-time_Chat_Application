import {
    BaseEntity,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinTable,
    ManyToMany,
    OneToOne
} from "typeorm";
import { User } from "./User.js";
import { ChatRoom } from "./Chatroom.js";
import { Relation } from "typeorm";
import { Attachment } from "../../dataBase/entities/Attachment.js";

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    MessageID: number

    @Column({ nullable: false })
    Content: string;

    @CreateDateColumn({ type: 'timestamp' })
    Timestamp: Date ;

    @Column({nullable:true})
    ChatRoomID: number

   
    @ManyToOne(() => User , user=>user.messages)
    user: Relation<User>

    @OneToOne(()=>Attachment , attachment=>attachment.message)
    @JoinColumn()
    attachment:Relation<Attachment>

}
