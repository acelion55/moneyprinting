import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyProfileDocument = CompanyProfile & Document;

@Schema()
export class FAQ {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;
}

@Schema({ timestamps: true })
export class CompanyProfile {
  @Prop({ required: true, unique: true })
  tenantId: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  industry: string;

  @Prop({ required: true })
  supportEmail: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, enum: ['friendly', 'formal', 'sales-oriented'] })
  brandVoice: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  offerings: string;

  @Prop({ type: [{ question: String, answer: String }], default: [] })
  faqs: FAQ[];

  @Prop({ type: [String], default: [] })
  documents: string[];
}

export const CompanyProfileSchema = SchemaFactory.createForClass(CompanyProfile);
