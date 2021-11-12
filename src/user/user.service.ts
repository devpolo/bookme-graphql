import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput);

    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find({ relations: ['bookings'] });
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail(id, { relations: ['bookings'] });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(name: string) {
    try {
      return await this.userRepository.findOneOrFail({ where: { name } });
    } catch {
      const newUser = this.userRepository.create({ name });

      return this.userRepository.save(newUser);
    }
  }
}
