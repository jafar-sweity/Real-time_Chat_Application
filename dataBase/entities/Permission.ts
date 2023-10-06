import { PrimaryGeneratedColumn } from "typeorm";
import { ManyToMany } from "typeorm";
import { Column } from "typeorm";
import { BaseEntity } from "typeorm";
import { Entity } from "typeorm";
import { User } from "./User.js";

@Entity()
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    permissionId : string

    @Column({
        type:'enum',
        enum: ['remove_user', 'add_user', 'send_message'],
        default:'send_message'
    })
    Name:'remove_user' | 'add_user' | 'send_message'


    @ManyToMany(()=>User)
    user:User

}
