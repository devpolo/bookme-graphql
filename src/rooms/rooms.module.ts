import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';

import { Room } from './entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomsService, RoomsResolver],
  exports: [RoomsService],
})
export class RoomsModule {}
