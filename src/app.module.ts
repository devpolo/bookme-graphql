import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { RoomsModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, // for interview purpose. should be false in production
      debug: true, // for interview purpose. should be false in production
      introspection: true, // for interview purpose. should be false in production
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: { rejectUnauthorized: false }, // for interview purpose
    }),
    RoomsModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
