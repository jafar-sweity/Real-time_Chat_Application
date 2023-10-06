import { Entity,BaseEntity,JoinColumn , PrimaryGeneratedColumn,ManyToOne,OneToOne, Column } from "typeorm";
import { User } from "./User.js";

@Entity() 
export class UserMute extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    MuteId:string

    @Column()
    MuterId:string


    @Column()
    MutedId:string




}


