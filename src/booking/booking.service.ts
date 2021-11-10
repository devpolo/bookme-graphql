import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';

import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(@InjectRepository(Booking) private bookingRepository: Repository<Booking>) {}

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

  update(id: number, updateBookingInput: UpdateBookingInput) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
