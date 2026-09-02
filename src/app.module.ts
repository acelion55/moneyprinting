import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module.js';
import { CompanyModule } from './company/company.module.js';
import { QdrantModule } from './qdrant/qdrant.module.js';
import { WhatsappModule } from './whatsapp/whatsapp.module.js';
import { WaitlistModule } from './waitlist/waitlist.module.js';

const logger = new Logger('DatabaseModule');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const primaryUri = configService.get<string>('MONGODB_URI') || '';
        return {
          uri: primaryUri,
          family: 4,
          serverSelectionTimeoutMS: 5000,
          retryAttempts: 3,
          retryDelay: 1000,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    CompanyModule,
    QdrantModule,
    WhatsappModule,
    WaitlistModule,
  ],
})
export class AppModule {}
