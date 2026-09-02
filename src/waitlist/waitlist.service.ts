import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Waitlist, WaitlistDocument } from '../schemas/waitlist.schema.js';
import { JoinWaitlistDto } from './dto/join-waitlist.dto.js';

@Injectable()
export class WaitlistService {
  constructor(
    @InjectModel(Waitlist.name)
    private waitlistModel: Model<WaitlistDocument>,
  ) {}

  async join(dto: JoinWaitlistDto) {
    const existing = await this.waitlistModel.findOne({ email: dto.email, module: dto.module });
    if (existing) {
      return { message: 'You are already on the waitlist!', existing: true };
    }
    const entry = new this.waitlistModel(dto);
    await entry.save();
    return { message: 'Successfully joined early access waitlist!', existing: false };
  }
}
