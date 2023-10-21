import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    Relation,
    JoinColumn,
    OneToMany // Import OneToMany
} from "typeorm";
import { User } from "./User.js";
import { Message } from "./Message.js"; // Import Message entity

@Entity()
export class ChatRoom extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    ChatRoomID: number

    @Column({ default: "group" })
    Name: string

    @Column({
        
        default: 'private', nullable: true
    })
    Type: string

    @Column({ type: 'timestamp' })
    creationDate: Date;

    @ManyToMany(() => User)
    @JoinTable()
    user: User[];

    @OneToMany(() => Message, message => message.chatRoom)
    @JoinColumn()
    messages:Message[];
}
