import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateBookingInput {
  @Field()
  title: string;

  @Field()
  start: Date;

  @Field()
  end: Date;

  @Field()
  roomId: string;
}
