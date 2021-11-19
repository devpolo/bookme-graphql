import { Resolver, Query, Mutation, Args, Parent, ResolveField, Int } from '@nestjs/graphql';

import { BookingService } from './booking.service';

import { Booking } from './entities/booking.entity';

import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';

import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { DeleteBookingInput } from './dto/delete-booking.input';
import { UserInputError } from 'apollo-server-errors';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Query(() => [Booking])
  bookings() {
    return this.bookingService.findAll();
  }

  @Query(() => [Booking])
  bookingById(@Args('id', { type: () => Int }) id: number) {
    return this.bookingService.findOne(id);
  }

  @Mutation(() => Booking)
  createBooking(@Args('createBookingInput') createBookingInput: CreateBookingInput) {
    return this.bookingService.create(createBookingInput);
  }

  @Mutation(() => Booking)
  async updateBooking(@Args('updateBookingInput') updateBookingInput: UpdateBookingInput) {
    const updatedBooking = await this.bookingService.update(
      updateBookingInput.id,
      updateBookingInput,
    );
    if (updatedBooking) {
      return updatedBooking;
    } else {
      throw new UserInputError('Not authorized');
    }
  }

  @Mutation(() => Boolean)
  async removeBooking(@Args('DeleteBookingInput') deleteBookingInput: DeleteBookingInput) {
    const success = await this.bookingService.remove(deleteBookingInput);
    if (success) {
      return true;
    } else {
      throw new UserInputError('Not authorized');
    }
  }

  @ResolveField((returns) => Room)
  room(@Parent() booking: Booking) {
    return this.bookingService.getRoom(booking.roomId);
  }

  @ResolveField((returns) => User)
  user(@Parent() booking: Booking) {
    return this.bookingService.getUser(booking.userId);
  }
}
