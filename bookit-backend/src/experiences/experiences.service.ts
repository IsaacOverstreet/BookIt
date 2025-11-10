import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ExperiencesService {
  constructor(private prisma: PrismaService) {}

  async getAllExperiences({ skip, take }: { skip: number; take: number }) {
    const experiences = await this.prisma.experience.findMany({
      skip,
      take,
      orderBy: { title: 'asc' },
    });
    return experiences;
  }

  async getExperienceById(id: string) {
    const data = await this.prisma.experience.findUnique({
      where: { id },
      include: { slots: true },
    });
    const tax = 0.075;
    if (!data) throw new BadRequestException('Failed to get experience');
    return {
      ...data,
      tax,
    };
  }
}
