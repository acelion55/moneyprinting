import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WaitlistService } from './waitlist.service.js';
import { WaitlistController } from './waitlist.controller.js';
import { Waitlist, WaitlistSchema } from '../schemas/waitlist.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Waitlist.name, schema: WaitlistSchema }]),
  ],
  controllers: [WaitlistController],
  providers: [WaitlistService],
})
export class WaitlistModule {}
