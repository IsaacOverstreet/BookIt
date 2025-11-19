import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export async function getSlotAndExperience(
  tx: Prisma.TransactionClient,
  slotId: string,
) {
  // const slot = await tx.slot.findUnique({
  //   where: { id: slotId },
  //   select: {
  //     id: true,
  //     capacity: true,
  //     experienceId: true,
  //     date: true,
  //     time: true,
  //   },
  // });
  // if (!slot) throw new BadRequestException('slot not found');
  // const experience = await tx.experience.findUnique({
  //   where: { id: slot.experienceId },
  //   select: { price: true, title: true },
  // });
  // if (!experience) throw new BadRequestException('experience not found');
  // return { slot, experience };
}
