import { BaseEntity , Entity, PrimaryGeneratedColumn, OneToOne,ManyToOne,JoinColumn} from "typeorm";
import { User } from "./User.js";
import { Relation } from "typeorm/browser";

@Entity()
export class UserBlock extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    BlockId : string


 
    @ManyToOne(()=>User,user=>user.UserId)
    @JoinColumn()
    BlockerId : Relation<User>


    @OneToOne (()=>User, user=>user.UserId)
    BlockedId: Relation<User>

}