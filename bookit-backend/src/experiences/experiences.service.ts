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
    console.log('🚀 ~ ExperiencesService ~ getExperienceById ~ data:', data);
    // const quantity = data?.dates[0].times[0]._count.slots;
    // const qty = data?.dates;

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
    console.log(skip);
    console.log(take);
    console.log(validatedSearch);
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
    console.log('🚀 ~ ExperiencesService ~ experience:', experience);
    const total = await this.prisma.experience.count();
    console.log('🚀 ~ ExperiencesService ~ getAllExperiences ~ total:', total);

    const totalPage = Math.ceil(total / take);
    console.log('🚀 ~ ExperiencesService ~ totalPage:', totalPage);
    return { experience, totalPage };
  }
}
