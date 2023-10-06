import { BaseEntity , Entity, PrimaryGeneratedColumn, OneToOne,ManyToOne,JoinColumn, Column, OneToMany} from "typeorm";
import { User } from "./User.js";

@Entity()
export class UserBlock extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    BlockId : string


 
    @Column()
    BlockerId : string


    @Column()
    BlockedId: string

}