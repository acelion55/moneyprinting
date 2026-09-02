import { Controller, Post, Body } from '@nestjs/common';
import { WaitlistService } from './waitlist.service.js';
import { JoinWaitlistDto } from './dto/join-waitlist.dto.js';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post('join')
  async joinWaitlist(@Body() dto: JoinWaitlistDto) {
    return this.waitlistService.join(dto);
  }
}
