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
  const taxRate = 7.5; // (%)
  const discountRate = 10; // (%)

  let discount = 0;
  let total = 0;
  let taxAmount = 0;

  if (promo === 'isaac' || promo === 'overstreet') {
    discount = subTotal * (discountRate / 100);
    const discountedSubtotal = subTotal - discount;
    taxAmount = discountedSubtotal * (taxRate / 100);
    total = parseFloat((discountedSubtotal + taxAmount).toFixed(2));
  } else if (promo) {
    throw new BadRequestException('Invalid promo code');
  } else {
    taxAmount = subTotal * (taxRate / 100);
    total = parseFloat((subTotal + taxAmount).toFixed(2));
  }

  return {
    subTotal,
    taxRate,
    discountRate,
    discount: parseFloat(discount.toFixed(2)),
    taxAmount: parseFloat(taxAmount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
}
