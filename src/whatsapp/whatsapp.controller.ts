import { Controller, Post, Body, Req, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { WhatsappService } from './whatsapp.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ApiKeyGuard } from '../auth/api-key.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('ingest')
  @UseInterceptors(FileInterceptor('document'))
  async ingestKnowledge(
    @Req() req: Request,
    @Body() body: any,
    @UploadedFile() file?: any,
  ) {
    const user = (req as any).user;
    const companyName = body.companyName || 'Business';
    const description = body.description || '';
    const offerings = body.offerings || '';
    let faqs = [];
    try {
      faqs = typeof body.faqs === 'string' ? JSON.parse(body.faqs) : body.faqs || [];
    } catch (e) {
      faqs = [];
    }

    const docText = file ? file.buffer.toString('utf-8') : '';
    const fullText = `${description} ${offerings}`;

    const result = await this.whatsappService.ingestKnowledgeBase(
      user.tenantId,
      companyName,
      fullText,
      faqs,
      docText,
    );

    return {
      message: 'Knowledge base ingested successfully',
      vectorsIngested: result.count,
    };
  }

  @UseGuards(ApiKeyGuard)
  @Post('ingest/n8n')
  async ingestFromN8n(@Body() body: any) {
    const { tenantId, companyName, description, offerings, faqs } = body;

    if (!tenantId || !companyName) {
      return { success: false, message: 'tenantId and companyName are required' };
    }

    const fullText = `${description || ''} ${offerings || ''}`;

    const result = await this.whatsappService.ingestKnowledgeBase(
      tenantId,
      companyName,
      fullText,
      faqs || [],
      '',
    );

    return {
      success: true,
      message: 'Knowledge base ingested from n8n',
      vectorsIngested: result.count,
    };
  }
}
