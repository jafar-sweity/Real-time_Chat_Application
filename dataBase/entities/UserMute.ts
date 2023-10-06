import { Entity,BaseEntity,JoinColumn , PrimaryGeneratedColumn,ManyToOne,OneToOne } from "typeorm";
import { User } from "./User.js";

@Entity() 
export class UserMute extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    MuteId:string

    @ManyToOne(()=>User , user=>user.UserId)
    @JoinColumn()
    MuterId:User


    @OneToOne(()=>User)
    MutedId:User




}


