import { BadRequestException, Injectable } from '@nestjs/common';
import {
  type BookingSchemaType,
  type PreviewSchemaType,
} from '../../lib/validator';
import { calculateTotals } from '../../lib/price';
import { getSlotAndExperience } from '../../lib/slotAndExperience';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  //calculate total for preview
  async calculateTotalPrice(body: PreviewSchemaType) {
    const { slotId, quantity } = body;
    return await this.prisma.$transaction(async (tx) => {
      const { slot, experience } = await getSlotAndExperience(tx, slotId);

      if (quantity > slot.capacity)
        throw new BadRequestException('Not enough seats available');

      const subTotal = experience.price * quantity;
      const taxRate = 0.075;
      const taxAmount = subTotal * taxRate;
      const total = taxAmount + subTotal;

      return {
        title: experience.title,
        date: slot.date,
        time: slot.time,
        quantity,
        pricePerTicket: experience.price,
        subTotal,
        taxRate,
        taxAmount,
        total,
      };
    });
  }

  //create booking
  async createBooking(body: BookingSchemaType) {
    const { slotId, quantity, userName, userEmail, promo } = body;
    const booking = await this.prisma.$transaction(async (tx) => {
      const { slot, experience } = await getSlotAndExperience(tx, slotId);

      if (quantity > slot.capacity)
        throw new BadRequestException('Not enough seats available');

      // ✅ Use helper to calculate total
      const { total } = calculateTotals({
        price: experience.price,
        quantity,
        promo,
      });

      await tx.slot.update({
        where: { id: slotId },
        data: { capacity: { decrement: quantity } },
      });

      return await tx.booking.create({
        data: {
          slotId,
          userName,
          userEmail,
          quantity,
          promoCode: promo ?? null,
          totalPrice: total,
        },
      });
    });
    return {
      success: true,
      bookingId: booking.id,
      totalPrice: Number(booking.totalPrice.toFixed(2)),
    };
  }
}
