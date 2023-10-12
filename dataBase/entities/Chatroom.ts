import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";
import { JoinTable } from "typeorm";

@Entity()
export class ChatRoom extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    ChatRoomID: number

    @Column({ default: "group" })
    Name: string

    @Column({
        type: 'enum',
        enum: ['private', 'group'],
        default: 'private'
    })
    Type: 'private' | 'group'

    @Column({type:'timestamp' , default:()=>'CURRENT_TIMESTAMP'})
    creationDate : Date;

    @ManyToMany(() => User)
    @JoinTable()
    user: User[]
}
