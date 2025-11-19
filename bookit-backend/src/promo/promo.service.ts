import { BadRequestException, Injectable } from '@nestjs/common';
import { type ApplyPromoSchemaType } from '../../lib/validator';
import { getSlotAndExperience } from '../../lib/slotAndExperience';
import { calculateTotals } from '../../lib/price';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) {}
  //apply promo
  async applypromo(body: ApplyPromoSchemaType) {
    const { slotId, quantity, promo } = body;
    // return await this.prisma.$transaction(async (tx) => {
    //   const { slot, experience } = await getSlotAndExperience(tx, slotId);

    //   if (quantity > slot.capacity)
    //     throw new BadRequestException('Not enough seats available');

    //   // ✅ Use helper to calculate total
    //   const total = calculateTotals({
    //     price: experience.price,
    //     quantity,
    //     promo,
    //   });

    //   return {
    //     title: experience.title,
    //     date: slot.date,
    //     time: slot.time,
    //     quantity,
    //     ...total, // includes subTotal, discount, taxAmount, total
    //   };
    // });
  }
}
