import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ExperiencesService {
  constructor(private prisma: PrismaService) {}

  async getAllExperiences({ skip, take }: { skip: number; take: number }) {
    const experience = await this.prisma.experience.findMany({
      skip,
      take,
      orderBy: { title: 'asc' },
    });
    const total = await this.prisma.experience.count();
    console.log('🚀 ~ ExperiencesService ~ getAllExperiences ~ total:', total);

    const totalPage = total / take;
    return { experience, totalPage };
  }

  async getExperienceById(id: string) {
    const data = await this.prisma.experience.findUnique({
      where: { id },
      include: {},
    });
    const tax = 0.075;
    if (!data) throw new BadRequestException('Failed to get experience');
    return {
      ...data,
      tax,
    };
  }

  async getExperienceBySearch(search: string) {
    const data = await this.prisma.experience.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    return data;
  }
}
