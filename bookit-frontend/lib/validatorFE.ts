import { z } from "zod";
const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

//booking schema
export const BookingSchema = z.object({
  slotId: z.string().regex(uuidRegex, { message: "Invalid slot ID format" }),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number().int().positive({ message: "Quantity must be a positive number" })
  ),
  userName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .trim(),
  userEmail: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" }),
  promo: z.string().min(3, { message: "Invalid promo code" }).optional(),
});
export type BookingSchemaType = z.infer<typeof BookingSchema>;

//promo schema
export const ApplyPromoSchema = z.object({
  timeId: z
    .string({ message: "Time ID is required" })
    .regex(uuidRegex, { message: "Invalid time ID format" }),

  quantity: z.preprocess(
    (val) => Number(val),
    z
      .number({ message: "Quantity must be a number" })
      .int({ message: "Quantity must be an integer" })
      .positive({ message: "Quantity must be positive" })
  ),

  promo: z
    .string({ message: "promo must be a string" })
    .min(3, { message: "Invalid promo code" })
    .optional(),
});
export type ApplyPromoSchemaType = z.infer<typeof ApplyPromoSchema>;
