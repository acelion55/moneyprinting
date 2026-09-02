import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyProfile, CompanyProfileDocument } from '../schemas/company-profile.schema.js';
import { CompanyProfileDto } from './dto/company-profile.dto.js';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(CompanyProfile.name)
    private companyModel: Model<CompanyProfileDocument>,
  ) {}

  async getProfile(tenantId: string) {
    const profile = await this.companyModel.findOne({ tenantId });
    if (!profile) {
      return null;
    }
    return profile;
  }

  async saveOrUpdateProfile(tenantId: string, dto: CompanyProfileDto) {
    let profile = await this.companyModel.findOne({ tenantId });
    if (profile) {
      Object.assign(profile, dto);
      return await profile.save();
    } else {
      profile = new this.companyModel({
        tenantId,
        ...dto,
      });
      return await profile.save();
    }
  }
}
