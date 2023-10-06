import {
    BaseEntity,
    CreateDateColumn,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

import { User } from "./User.js";

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    MessageID: number

    @ManyToOne(() => User, user => user.UserId)
    @JoinColumn()
    SenderUserId: User;

    @Column({ nullable: false })
    Content: string;

    @CreateDateColumn({ type: 'timestamp'})
    Timestamp:Date ;

    @Column()
    ChatRoomID:number


    @Column('blob',{nullable:true})
    Attachment:Buffer




}