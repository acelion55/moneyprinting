import { IsEmail, IsEnum } from 'class-validator';

export class JoinWaitlistDto {
  @IsEmail()
  email: string;

  @IsEnum(['ivr', 'ai-calling'])
  module: string;
}
