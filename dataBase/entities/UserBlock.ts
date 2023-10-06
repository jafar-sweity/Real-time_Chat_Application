import { BaseEntity , Entity, PrimaryGeneratedColumn, OneToOne,ManyToOne,JoinColumn} from "typeorm";
import { User } from "./User.js";

@Entity()
export class UserBlock extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    BlockId : string


 
    @ManyToOne(()=>User,user=>user.UserId)
    @JoinColumn()
    BlockerId : User


    @OneToOne (()=>User, user=>user.UserId)
    BlockedId: User

}