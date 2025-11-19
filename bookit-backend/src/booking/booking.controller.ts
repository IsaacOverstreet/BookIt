import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { BookingSchema, type BookingSchemaType } from '../../lib/validator';
import { BookingService } from './booking.service';
import { ZodError } from 'zod';
// import { ZodError } from 'zod';

// interface CalculateTotal {
//   slotId: string;
//   quantity: number;
// }

@Controller('/calculate-total')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  //   @Post()
  //   async calculateTotalPrice(@Body() body: CalculateTotal) {
  //     try {
  //       const res = await this.bookingService.calculateTotalPrice(body);
  //       return {
  //         success: true,
  //         message: 'calculation successful',
  //         data: res,
  //       };
  //     } catch (error) {
  //       console.log(error);

  //       throw new BadRequestException({
  //         success: false,
  //         type: 'UNKNOWN_ERROR',
  //         message: 'Something went wrong',
  //       });
  //     }
  //   }

  //   @Post('/booking')
  //   async bookExperience(@Body() body: BookingSchemaType) {
  //     try {
  //       const validated = BookingSchema.parse(body);
  //       const res = await this.bookingService.createBooking(validated);
  //       return {
  //         success: true,
  //         meessage: 'booking created sucessfully',
  //         data: res,
  //       };
  //     } catch (error) {
  //       console.log(error);
  //       if (error instanceof ZodError) {
  //         throw new BadRequestException({
  //           success: false,
  //           type: 'VALIDATION ERROR',
  //           message: 'Invalid booking data',
  //           errors: error.issues,
  //         });
  //       }
  //     }
  //   }
}
