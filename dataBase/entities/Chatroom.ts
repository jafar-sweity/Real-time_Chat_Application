import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";
import { JoinTable } from "typeorm";
import { Relation } from "typeorm";

@Entity()
export class ChatRoom extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    ChatRoomID:number

    @Column({ default: "group" })
    Name: string

    @Column({
        default: 'private', nullable:true
    })
    Type: string

    @Column({type:'timestamp'})
    creationDate : Date;

    @ManyToMany(() => User)
    @JoinTable()
    user: Relation<User>    
}
