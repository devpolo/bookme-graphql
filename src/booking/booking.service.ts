import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository, UpdateValuesMissingError } from 'typeorm';

import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';

import { Booking } from './entities/booking.entity';

import { RoomsService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';

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
    try {
      const booking = await this.bookingRepository.findOneOrFail(id);

      if (updateBookingInput.userId === booking.userId) {
        this.bookingRepository.update(updateBookingInput.userId, updateBookingInput);

        await this.bookingRepository.update(id, {
          ...updateBookingInput,
        });

        return this.bookingRepository.findOne(updateBookingInput.userId);
      } else {
        throw new UnauthorizedException('Not authorized');
      }
    } catch (error) {
      console.error(error);
    }

    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return this.bookingRepository.delete(id);
  }

  getRoom(bookingId: number) {
    return this.roomsService.findOne(bookingId);
  }

  getUser(userId: number) {
    return this.userService.findOne(userId);
  }
}
