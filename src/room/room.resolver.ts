import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { RoomsService } from './room.service';
import { Room } from './entities/room.entity';

import { CreateRoomInput } from './dto/create-room.input';

@Resolver((of) => Room)
export class RoomsResolver {
  constructor(private roomsService: RoomsService) {}

  @Query((returns) => [Room])
  async rooms(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Query((returns) => Room)
  async roomById(@Args('id', { type: () => String }) id: string): Promise<Room> {
    return this.roomsService.findOne(id);
  }

  @Mutation((returns) => Room)
  async createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput): Promise<Room> {
    return this.roomsService.createRoom(createRoomInput);
  }
}
