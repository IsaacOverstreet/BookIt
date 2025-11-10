import { Controller, Get, Param, Query } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';

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

  @Get(':id')
  async getExperience(@Param('id') id: string) {
    if (!id) throw new Error('invalid Id');
    const res = this.experiencesServices.getExperienceById(id);
    return res;
  }
}
