import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { searchSchema } from '../../lib/validator';
import { ZodError } from 'zod';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesServices: ExperiencesService) {}

  @Get()
  async getAllExperiences(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    return this.experiencesServices.getAllExperiences({ skip, take: limitNum });
  }

  @Get('search')
  async searchExperience(@Query('search') search: string) {
    try {
      console.log('search', search);
      const validate = searchSchema.parse(search);
      const res =
        await this.experiencesServices.getExperienceBySearch(validate);
      return {
        success: true,
        data: res,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          success: false,
          type: 'VALIDATION ERROR',
          message: 'invalid search input',
          errors: error.issues,
        });
      } else {
        throw new BadRequestException({
          success: false,
          type: 'Network Error',
          message: 'Something went wrong',
        });
      }
    }
  }

  @Get(':id')
  async getExperience(@Param('id') id: string) {
    if (!id) throw new Error('invalid Id');
    const res = this.experiencesServices.getExperienceById(id);
    return res;
  }
}
