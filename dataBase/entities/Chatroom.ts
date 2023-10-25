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

    @Column()
    Name: string

    @Column({
        default: 'group', nullable: true
    })
    Type: string

    @Column({ type: 'timestamp' , default: () => 'CURRENT_TIMESTAMP'})
    creationDate: Date;

    @ManyToMany(() => User)
    @JoinTable()
    user: Relation<User>[];

    @OneToMany(() => Message, message => message.chatRoom)
    @JoinColumn()
    messages:Message[];
}
