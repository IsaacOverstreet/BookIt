import { BadRequestException } from '@nestjs/common';

export function calculateTotals({
  price,
  promo,
  quantity,
}: {
  price: number;
  promo?: string;
  quantity: number;
}) {
  const subTotal = price * quantity;

  const taxRate = 7.5; // %
  const discountRate = 10; // %

  let discount = 0;
  let discountedSubtotal = subTotal;

  // Validate promo
  if (promo) {
    const validPromos = ['isaac', 'overstreet'];

    if (!validPromos.includes(promo)) {
      throw new BadRequestException('Invalid promo code');
    }

    discount = subTotal * (discountRate / 100);
    discountedSubtotal = subTotal - discount;
  }

  // Tax is always calculated last
  const taxAmount = discountedSubtotal * (discountRate / 100);

  // Final amount to charge
  const discountTotal = Number((discountedSubtotal + taxAmount).toFixed(2));

  return {
    discountedSubtotal: parseFloat(discountedSubtotal.toFixed(2)),
    taxRate,
    discountRate,
    discount: parseFloat(discount.toFixed(2)),
    taxAmount: parseFloat(taxAmount.toFixed(2)),
    discountTotal: parseFloat(discountTotal.toFixed(2)),
  };
}
