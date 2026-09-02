import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module.js';
import { CompanyService } from './company.service.js';
import { CompanyController } from './company.controller.js';
import { CompanyProfile, CompanyProfileSchema } from '../schemas/company-profile.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CompanyProfile.name, schema: CompanyProfileSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
