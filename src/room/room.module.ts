import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsService } from './room.service';
import { RoomsResolver } from './room.resolver';

import { Room } from './entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomsService, RoomsResolver],
  exports: [RoomsService],
})
export class RoomsModule {}
