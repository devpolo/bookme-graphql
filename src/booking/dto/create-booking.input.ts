import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookingInput {
  @Field()
  title: string;

  @Field()
  start: Date;

  @Field()
  end: Date;

  @Field()
  roomId: number;

  @Field()
  userId: number;
}
