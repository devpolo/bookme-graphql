import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

  async findAll(): Promise<Room[]> {
    const room = new Room();
    room.id = 0;
    room.name = 'C01';

    return [room];
  }
}
