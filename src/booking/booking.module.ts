import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';

import { Booking } from './entities/booking.entity';

import { RoomsModule } from 'src/room/room.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), RoomsModule, UserModule],
  providers: [BookingService, BookingResolver],
})
export class BookingModule {}
