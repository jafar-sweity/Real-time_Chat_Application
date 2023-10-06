import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ChatRoom extends BaseEntity{
    
@PrimaryGeneratedColumn('increment')
ChatRoomID:number

@Column({default:"group"})
Name:string

@Column({
    type:'enum',
    enum: ['private', 'group'],
    default: 'private'
})
Type:'private' | 'group'

 

}