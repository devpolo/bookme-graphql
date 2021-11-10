import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateRoomInput } from './dto/create-room.input';

import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

  async createRoom(createRoomInput: CreateRoomInput): Promise<Room> {
    const newRoom = this.roomRepository.create(createRoomInput);

    return this.roomRepository.save(newRoom);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }
}
