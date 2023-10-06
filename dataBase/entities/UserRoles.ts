import { Column } from "typeorm/browser";
import { ManyToMany } from "typeorm/browser";
import { PrimaryGeneratedColumn } from "typeorm/browser";
import { Entity } from "typeorm/browser";
import { BaseEntity } from "typeorm/browser";
import { User } from "./User.js";
import { JoinTable } from "typeorm/browser";


@Entity()
export class UserRoles extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    RoleId :string

    @Column()
    Name:string


    @ManyToMany(()=>User)
    @JoinTable()
    user:User


    @ManyToMany(()=>Permission)
    @JoinTable()
    permission:Permission
}