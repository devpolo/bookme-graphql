import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Room {
  @ObjectIdColumn()
  @Field((type) => ID)
  id: ObjectID;

  @Column()
  @Field()
  name: string;
}
