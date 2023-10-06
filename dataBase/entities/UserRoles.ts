import { Column, ManyToMany, PrimaryGeneratedColumn, Entity, BaseEntity, JoinTable } from "typeorm";
import { User } from "./User.js";
import { Permission } from "./Permission.js";

@Entity()
export class UserRoles extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    RoleId: string

    @Column({
        type:'enum',
        enum:['user','admin'],
        default:'user'
    })
    Name: 'user'|'admin'

  

    @ManyToMany(() => Permission)
    @JoinTable()
    permission: Permission[]
}
