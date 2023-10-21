import bcrypt from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';

import { Message } from './Message.js';
import { ChatRoom } from './Chatroom.js';
import { UserBlock } from './UserBlock.js';
import { UserMute } from './UserMute.js';
import { UserRoles } from './UserRoles.js';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  UserId: string;

  @Column({ nullable: false })
  Username: string;

  

  @Column({ unique: true, nullable: false })
  @Length(8, 20)
  Password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.Password) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      this.Password = await bcrypt.hash(this.Password, salt);
    }
  }

  @Column({ nullable: false })
  @IsEmail()
  Email: string;

  @Column({ default: false })
  OnlineStatus: boolean;


  @ManyToMany(() => ChatRoom)
  @JoinTable()
  chatRooms: ChatRoom[];
  

  @OneToMany(() => UserBlock, userBlock => userBlock.Blocked)
  blockedUsers: UserBlock;

  @OneToMany(() => UserMute, userMute => userMute.MutedId)
  mutedUsers: UserMute[];

  @ManyToMany(() => UserRoles)
  @JoinTable()
  roles: UserRoles[];

  @OneToMany(() => Message, message => message.user) 
  messages: Message[];
  

}
