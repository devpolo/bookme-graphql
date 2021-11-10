import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { RoomsService } from './rooms.service';
import { Room } from './room.entity';
import { CreateRoomInput } from './dto/create-room.input';

@Resolver((of) => Room)
export class RoomsResolver {
  constructor(private roomsService: RoomsService) {}

  @Query((returns) => [Room])
  async rooms(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Mutation((returns) => Room)
  async createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput): Promise<Room> {
    return this.roomsService.createRoom(createRoomInput);
  }
}
