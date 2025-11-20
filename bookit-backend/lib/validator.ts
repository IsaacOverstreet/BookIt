import { z } from 'zod';

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

//preview schema
export const PreviewSchema = z.object({
  slotId: z.string().regex(uuidRegex, { message: 'Invalid slot ID format' }),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number().int().positive({ message: 'Quantity must be positive' }),
  ),
});
export type PreviewSchemaType = z.infer<typeof PreviewSchema>;

//promo schema
export const ApplyPromoSchema = z.object({
  slotId: z.string().regex(uuidRegex, { message: 'Invalid slot ID format' }),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number().int().positive({ message: 'Quantity must be positive' }),
  ),
  promo: z.string().min(3, { message: 'Invalid promo code' }).optional(),
});
export type ApplyPromoSchemaType = z.infer<typeof ApplyPromoSchema>;

//booking schema
export const BookingSchema = z.object({
  slotId: z.string().regex(uuidRegex, { message: 'Invalid slot ID format' }),
  quantity: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .int()
      .positive({ message: 'Quantity must be a positive number' }),
  ),
  userName: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .trim(),
  userEmail: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email address' }),
  promo: z.string().min(3, { message: 'Invalid promo code' }).optional(),
});
export type BookingSchemaType = z.infer<typeof BookingSchema>;

//search schema
export const searchSchema = z
  .string()
  .trim()

  .min(1, { message: 'Search is required.' })

  .refine((s) => (s.match(/[A-Za-z]/g) ?? []).length >= 2, {
    message: 'Search must contain at least 2 letters.',
  })

  .regex(/^[A-Za-z\s]+$/, {
    message:
      'Search may contain only letters and spaces (no code, numbers, or symbols).',
  });

export type SearchInput = z.infer<typeof searchSchema>;
