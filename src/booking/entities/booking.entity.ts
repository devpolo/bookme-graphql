import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
@ObjectType()
export class Booking {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  start: Date;

  @Column()
  @Field()
  end: Date;

  @Column()
  @Field((type) => Int, { nullable: true })
  roomId?: number;

  @ManyToOne(() => Room, (room) => room.bookings, { onDelete: 'CASCADE' })
  @Field((type) => Room, { nullable: true })
  room?: Room;

  @Column()
  @Field((type) => Int, { nullable: true })
  userId?: number;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  @Field((type) => User, { nullable: true })
  user?: User;
}
