import { Resolver, Query } from '@nestjs/graphql';

import { RoomsService } from './rooms.service';
import { Room } from './room.entity';

@Resolver((of) => Room)
export class RoomsResolver {
  constructor(private roomsService: RoomsService) {}

  @Query((returns) => [Room])
  async rooms(): Promise<Room[]> {
    return this.roomsService.findAll();
  }
}
