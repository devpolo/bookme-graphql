import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';

import { Booking } from './entities/booking.entity';

import { RoomsModule } from 'src/room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), RoomsModule],
  providers: [BookingService, BookingResolver],
})
export class BookingModule {}
