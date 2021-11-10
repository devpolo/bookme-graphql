import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Room {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;
}
