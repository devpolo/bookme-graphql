import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
