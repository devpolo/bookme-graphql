import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Room } from 'src/room/entities/room.entity';

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
  @Field((type) => Int)
  roomId: number;

  @ManyToOne(() => Room, (room) => room.bookings)
  @Field((type) => Room)
  room: Room;
}
