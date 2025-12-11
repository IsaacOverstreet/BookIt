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
    const { timeId, quantity, promo } = body;
    return await this.prisma.$transaction(async (tx) => {
      const { time, experience } = await getSlotAndExperience(tx, timeId);
      const capacity = time.slots.length;
      console.log('capa', capacity);
      if (quantity > capacity)
        throw new BadRequestException('Not enough seats available');

      // ✅ Use helper to calculate total
      const total = calculateTotals({
        price: experience.price,
        quantity,
        promo,
      });

      return {
        ...total, // includes subTotal, discount, taxAmount, total
      };
    });
  }
}
