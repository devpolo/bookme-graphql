import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  async findAll(): Promise<Room[]> {
    const room = new Room();
    room.id = 0;
    room.name = 'C01';

    return [room];
  }
}
