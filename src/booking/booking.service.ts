import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';

import { Booking } from './entities/booking.entity';

import { RoomsService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';
import { DeleteBookingInput } from './dto/delete-booking.input';
import { areIntervalsOverlapping } from 'date-fns';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    private roomsService: RoomsService,
    private userService: UserService,
  ) {}

  create(createBookingInput: CreateBookingInput) {
    const newBooking = this.bookingRepository.create(createBookingInput);
    return this.bookingRepository.save(newBooking);
  }

  findAll() {
    return this.bookingRepository.find();
  }

  findOne(id: number) {
    this.bookingRepository.findOneOrFail(id);
  }

  async update(id: number, updateBookingInput: UpdateBookingInput) {
    const booking = await this.bookingRepository.findOneOrFail(id);

    if (updateBookingInput.userId === booking.userId) {
      this.bookingRepository.update(updateBookingInput.userId, updateBookingInput);

      const { id: idToRemove, ...data } = updateBookingInput;

      await this.bookingRepository.update(id, {
        ...data,
      });

      return this.bookingRepository.findOneOrFail(id);
    } else {
      return null;
    }
  }

  async remove(deleteBookingInput: DeleteBookingInput) {
    const booking = await this.bookingRepository.findOneOrFail(deleteBookingInput.id);
    if (deleteBookingInput.userId === booking.userId) {
      await this.bookingRepository.delete(deleteBookingInput.id);
      return true;
    } else {
      return false;
    }
  }

  async isOverlapping(input: CreateBookingInput | UpdateBookingInput) {
    const bookingsByRoomId = await this.bookingRepository.find({ where: { roomId: input.roomId } });

    bookingsByRoomId.forEach((booking) => {
      const isOverlapping = areIntervalsOverlapping(
        { start: new Date(booking.start), end: new Date(booking.end) },
        { start: new Date(input.start), end: new Date(input.end) },
      );

      if (isOverlapping) throw new Error('Meeting room already booked');
    });
  }

  getRoom(bookingId: number) {
    return this.roomsService.findOne(bookingId);
  }

  getUser(userId: number) {
    return this.userService.findOne(userId);
  }
}
