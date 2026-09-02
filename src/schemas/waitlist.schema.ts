import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WaitlistDocument = Waitlist & Document;

@Schema({ timestamps: true })
export class Waitlist {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true, enum: ['ivr', 'ai-calling'] })
  module: string;
}

export const WaitlistSchema = SchemaFactory.createForClass(Waitlist);
