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

    const totalPage = Math.ceil(total / take);
    return { experience, totalPage };
  }

  async getExperienceById(id: string) {
    const data = await this.prisma.experience.findUnique({
      where: { id },
      include: {
        dates: {
          include: {
            times: {
              include: {
                _count: {
                  select: { slots: true },
                },
                slots: true,
              },
            },
          },
        },
      },
    });

    const tax = 7.5;
    if (!data) throw new BadRequestException('Failed to get experience');
    return {
      ...data,
      tax,
      // quantity,
    };
  }

  async getExperienceBySearch({
    skip,
    take,
    validatedSearch,
  }: {
    skip: number;
    take: number;
    validatedSearch: string;
  }) {
    const experience = await this.prisma.experience.findMany({
      where: {
        title: {
          contains: validatedSearch,
          mode: 'insensitive',
        },
      },
      skip,
      take,
      orderBy: { title: 'asc' },
    });

    const total = await this.prisma.experience.count();

    const totalPage = Math.ceil(total / take);

    return { experience, totalPage };
  }
}
