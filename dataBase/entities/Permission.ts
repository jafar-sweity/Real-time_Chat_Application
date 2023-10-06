import { PrimaryGeneratedColumn } from "typeorm/browser";
import { ManyToMany } from "typeorm/browser";
import { Column } from "typeorm/browser";
import { BaseEntity } from "typeorm/browser";
import { Entity } from "typeorm/browser";
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
