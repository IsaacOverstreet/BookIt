import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export async function getSlotAndExperience(
  tx: Prisma.TransactionClient,
  timeId: string,
) {
  const time = await tx.experienceTime.findUnique({
    where: { id: timeId },
    select: {
      id: true,
      _count: true,
      dateId: true,
      time: true,
      slots: true,
    },
  });
  if (!time) throw new BadRequestException('time not found');

  const date = await tx.experienceDate.findUnique({
    where: { id: time.dateId },
    select: { id: true, experienceId: true, date: true },
  });
  if (!date)
    throw new BadRequestException('date associated with time not found');

  const experience = await tx.experience.findUnique({
    where: { id: date.experienceId },
    select: { price: true, title: true },
  });
  if (!experience) throw new BadRequestException('experience not found');
  return { time, experience, date };
}
