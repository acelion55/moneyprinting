import { Injectable } from '@nestjs/common';
import { QdrantService } from '../qdrant/qdrant.service.js';
import { CompanyService } from '../company/company.service.js';

@Injectable()
export class WhatsappService {
  constructor(
    private qdrantService: QdrantService,
    private companyService: CompanyService,
  ) {}

  private chunkText(text: string, chunkSize = 500): string[] {
    if (!text) return [];
    const chunks: string[] = [];
    let index = 0;
    while (index < text.length) {
      chunks.push(text.slice(index, index + chunkSize));
      index += chunkSize - 50; // 50 char overlap
    }
    return chunks;
  }

  async ingestKnowledgeBase(
    tenantId: string,
    companyName: string,
    rawText: string,
    faqs: Array<{ question: string; answer: string }> = [],
    documentContent?: string,
  ) {
    const items: Array<{ tenantId: string; companyName: string; text: string; type: 'faq' | 'doc' }> = [];

    // 1. Process Text Description & Offerings
    if (rawText) {
      const textChunks = this.chunkText(rawText);
      textChunks.forEach((chunk) => {
        items.push({ tenantId, companyName, text: chunk, type: 'doc' });
      });
    }

    // 2. Process FAQs
    faqs.forEach((faq) => {
      const faqText = `Q: ${faq.question} A: ${faq.answer}`;
      items.push({ tenantId, companyName, text: faqText, type: 'faq' });
    });

    // 3. Process Uploaded Doc Text
    if (documentContent) {
      const docChunks = this.chunkText(documentContent);
      docChunks.forEach((chunk) => {
        items.push({ tenantId, companyName, text: chunk, type: 'doc' });
      });
    }

    if (items.length > 0) {
      return await this.qdrantService.upsertVectors(items);
    }
    return { success: true, count: 0 };
  }
}
