import { Entity, BaseEntity, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User.js";
import { Relation } from "typeorm";

@Entity()
export class UserMute extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  MuteId: string;

  @ManyToOne(() => User, user => user.UserId)
  @JoinColumn()
  MutedId: Relation<User>;

  @ManyToOne(() => User, user => user.UserId)
  @JoinColumn()
  MuterId: Relation<User>;
}
