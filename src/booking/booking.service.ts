import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';

import { Booking } from './entities/booking.entity';

import { RoomsService } from 'src/room/room.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    private roomsService: RoomsService,
  ) {}

  create(createBookingInput: CreateBookingInput) {
    const newBooking = this.bookingRepository.create(createBookingInput);
    return this.bookingRepository.save(newBooking);
  }

  findAll() {
    return this.bookingRepository.find();
  }

  findOne(id: string) {
    this.bookingRepository.findOneOrFail(id);
  }

  update(id: string, updateBookingInput: UpdateBookingInput) {
    return `This action updates a #${id} booking`;
  }

  remove(id: string) {
    return this.bookingRepository.delete(id);
  }

  getRoom(bookingId: string) {
    return this.roomsService.findOne(bookingId);
  }
}
