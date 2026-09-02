import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { WhatsappService } from './whatsapp.service.js';
import { WhatsappController } from './whatsapp.controller.js';
import { QdrantModule } from '../qdrant/qdrant.module.js';
import { CompanyModule } from '../company/company.module.js';

@Module({
  imports: [QdrantModule, CompanyModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [WhatsappController],
  providers: [WhatsappService],
})
export class WhatsappModule {}
