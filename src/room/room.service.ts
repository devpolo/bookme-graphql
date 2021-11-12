import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateRoomInput } from './dto/create-room.input';

import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find({ relations: ['bookings'] });
  }

  async findOne(id: number): Promise<Room> {
    return this.roomRepository.findOneOrFail(id, { relations: ['bookings'] });
  }

  async createRoom(createRoomInput: CreateRoomInput): Promise<Room> {
    const newRoom = this.roomRepository.create(createRoomInput);

    return this.roomRepository.save(newRoom);
  }

  async deleteById(id: number) {
    this.roomRepository.delete(id);
  }
}
