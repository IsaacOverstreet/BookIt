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

  // calculate total for preview
  async calculateTotalPrice(body: PreviewSchemaType) {
    const { timeId, quantity } = body;
    return await this.prisma.$transaction(async (tx) => {
      const { date, time, experience } = await getSlotAndExperience(tx, timeId);
      const capacity = time.slots.length;
      if (quantity > capacity)
        throw new BadRequestException('Not enough seats available');
      const subTotal = experience.price * quantity;
      const taxRatePercent = 7.5;
      const taxRate = taxRatePercent / 100;
      const taxAmount = subTotal * taxRate;
      const total = taxAmount + subTotal;
      return {
        title: experience.title,
        date: date.date,
        time: time.time,
        quantity,
        pricePerTicket: experience.price,
        subTotal,
        taxRatePercent,
        taxAmount,
        total,
        timeId,
      };
    });
  }

  //create booking
  async createBooking(body: BookingSchemaType) {
    const { timeId, quantity, userName, userEmail, promo } = body;
    const booking = await this.prisma.$transaction(async (tx) => {
      const { time, experience } = await getSlotAndExperience(tx, timeId);
      const capacity = time.slots.length;
      if (quantity > capacity)
        throw new BadRequestException('Not enough seats available');
      // ✅ Use helper to calculate total
      const total = calculateTotals({
        price: experience.price,
        quantity,
        promo,
      });
      const slotToDelete = time.slots.slice(0, quantity).map((slot) => slot.id);

      await tx.experienceSlot.deleteMany({
        where: { id: { in: slotToDelete } },
      });
      return await tx.booking.create({
        data: {
          userName,
          userEmail,
          quantity,
          promoCode: promo ?? null,
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
