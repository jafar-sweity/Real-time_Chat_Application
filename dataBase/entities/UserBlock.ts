import { BaseEntity , Entity, PrimaryGeneratedColumn, OneToOne,ManyToOne,JoinColumn} from "typeorm";
import { User } from "../entities/User.js";
import { Relation } from "typeorm";

@Entity()
export class UserBlock extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    BlockId : string

 
    @ManyToOne(()=>User,user=>user.blockedUsers)
    @JoinColumn({ name: 'blockerUserId' }) 
    Blocker : any[]


    @OneToOne (()=>User, user=>user.blockedBy)
    @JoinColumn({ name: 'blockedUserId' }) 
    Blocked: any

}