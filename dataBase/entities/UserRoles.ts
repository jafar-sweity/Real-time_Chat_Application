import { Column, ManyToMany, PrimaryGeneratedColumn, Entity, BaseEntity, JoinTable } from "typeorm";
import { User } from "./User.js";
import { Permission } from "./Permission.js";

@Entity()
export class UserRoles extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    RoleId: string

    @Column()
    Name: string

  

    @ManyToMany(() => Permission)
    @JoinTable()
    permission: Permission[]
}
