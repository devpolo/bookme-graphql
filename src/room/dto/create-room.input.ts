import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field()
  title: string;
}
