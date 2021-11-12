import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  @Length(2, 30, { message: 'The name must be at least 2 but not longer than 30 characters' })
  @IsNotEmpty({ message: 'The name is required' })
  name!: string;
}
