import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { CompanyService } from './company.service.js';
import { CompanyProfileDto } from './dto/company-profile.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('profile')
  async getProfile(@Req() req: Request) {
    const user = (req as any).user;
    const profile = await this.companyService.getProfile(user.tenantId);
    return profile || {};
  }

  @Post('profile')
  async saveProfile(@Req() req: Request, @Body() dto: CompanyProfileDto) {
    const user = (req as any).user;
    return this.companyService.saveOrUpdateProfile(user.tenantId, dto);
  }
}
