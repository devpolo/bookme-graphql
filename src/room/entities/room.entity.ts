import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

import { Booking } from 'src/booking/entities/booking.entity';

@Entity()
@ObjectType()
export class Room {
  @ObjectIdColumn()
  @Field((type) => ID)
  id: ObjectID;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Booking, (booking) => booking.room)
  @Field((type) => [Booking], { nullable: true })
  bookings: Booking[];

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
