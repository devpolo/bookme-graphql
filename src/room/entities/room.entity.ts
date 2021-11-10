import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Booking } from 'src/booking/entities/booking.entity';

@Entity()
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Booking, (booking) => booking.room)
  @Field((type) => [Booking], { nullable: true })
  bookings: Booking[];
}
