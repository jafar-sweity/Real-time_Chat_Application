import bcrypt from 'bcrypt';
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";
import { IsEmail, Length } from "class-validator";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    UserId: string

    @Column({ nullable: false })
    Username: string

    @Column({ unique: true, nullable: false })
    @Length(8, 20)
    Passowrd: any


    @BeforeInsert()
    @BeforeUpdate()
    async hashPassowrd() {
        if (this.Passowrd) {
            const salt: any = bcrypt.genSalt();
            this.Passowrd = bcrypt.hash(this.Passowrd, salt);
        }


    }





    @Column({ nullable: false })
    @IsEmail()
    Email: string

    @Column()
    OnlineStatus: boolean



}



