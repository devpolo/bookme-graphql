import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookingInput {
  @Field()
  title: number;

  @Field()
  start: Date;

  @Field()
  end: Date;

  @Field()
  roomId: string;
}
