import { Body, Controller, Post } from '@nestjs/common';
import {
  BookingSchema,
  type PreviewCalcuateSchemaType,
  type BookingSchemaType,
  PreviewSchema,
} from '../../lib/validator';
import { BookingService } from './booking.service';

@Controller('/calculate-total')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async calculateTotalPrice(@Body() body: PreviewCalcuateSchemaType) {
    const validated = PreviewSchema.parse(body);
    const res = await this.bookingService.calculateTotalPrice(validated);
    return {
      success: true,
      message: 'calculation successful',
      data: res,
    };
  }

  //create a new booking
  @Post('/booking')
  async bookExperience(@Body() body: BookingSchemaType) {
    const validated = BookingSchema.parse(body);
    const res = await this.bookingService.createBooking(validated);
    return {
      success: true,
      message: 'booking created sucessfully',
      data: res,
    };
  }
}
