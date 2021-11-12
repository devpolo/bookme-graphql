import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteBookingInput {
  @Field()
  id: number;

  @Field()
  userId: number;
}
