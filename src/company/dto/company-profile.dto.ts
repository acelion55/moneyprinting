import { IsString, IsEmail, IsEnum, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FAQDto {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}

export class CompanyProfileDto {
  @IsString()
  companyName: string;

  @IsString()
  industry: string;

  @IsEmail()
  supportEmail: string;

  @IsString()
  phone: string;

  @IsEnum(['friendly', 'formal', 'sales-oriented'])
  brandVoice: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  offerings?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FAQDto)
  faqs?: FAQDto[];

  @IsOptional()
  @IsArray()
  documents?: string[];
}
