import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { Room } from 'src/rooms/room.entity';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Mutation(() => Booking)
  createBooking(@Args('createBookingInput') createBookingInput: CreateBookingInput) {
    return this.bookingService.create(createBookingInput);
  }

  @Query(() => [Booking], { name: 'booking' })
  findAll() {
    return this.bookingService.findAll();
  }

  // @Query(() => Booking, { name: 'booking' })
  // findOne(@Args('id', { type: () => String }) id: number) {
  //   return this.bookingService.findOne(id);
  // }

  @ResolveField((returns) => Room)
  room(@Parent() booking: Booking) {
    return this.bookingService.getRoom(booking.roomId);
  }

  @Mutation(() => Booking)
  updateBooking(@Args('updateBookingInput') updateBookingInput: UpdateBookingInput) {
    return this.bookingService.update(updateBookingInput.id, updateBookingInput);
  }

  @Mutation(() => Booking)
  removeBooking(@Args('id', { type: () => String }) id: number) {
    return this.bookingService.remove(id);
  }
}
