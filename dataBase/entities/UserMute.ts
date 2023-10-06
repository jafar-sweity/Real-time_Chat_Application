import { Entity,BaseEntity,JoinColumn , PrimaryGeneratedColumn,ManyToOne,OneToOne } from "typeorm";
import { User } from "./User.js";
import { Column } from "typeorm";
import { Relation } from "typeorm";

@Entity() 
export class UserMute extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    MuteId:string

    @ManyToOne(()=>User , user=>user.UserId)
    @JoinColumn()
    MuterId:Relation<User>


    @OneToOne (()=>User, user=>user.UserId)
    MutedId: Relation<User>



}


