import { BaseEntity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./Message.js";
import { Entity } from "typeorm";
import { Relation } from "typeorm";
import { JoinColumn } from "typeorm/browser";

@Entity()
export class Attachment extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id : number

    @Column({nullable:true ,type:'blob'})
    attachment:Buffer

    @OneToOne(()=>Message, message =>message.attachment)
    message:Relation<Message>

}