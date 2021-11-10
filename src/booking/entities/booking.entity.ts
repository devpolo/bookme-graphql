import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Room } from 'src/rooms/entities/room.entity';

@Entity()
@ObjectType()
export class Booking {
  @ObjectIdColumn()
  @Field((type) => ID)
  id: ObjectID;

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
  @Field()
  roomId: string;

  @ManyToOne(() => Room, (room) => room.bookings)
  @Field((type) => Room)
  room: Room;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
