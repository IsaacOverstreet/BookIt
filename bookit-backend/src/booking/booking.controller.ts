import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { BookingSchema, type BookingSchemaType } from '../../lib/validator';
import { BookingService } from './booking.service';
import { ZodError } from 'zod';

interface CalculateTotal {
  timeId: string;
  quantity: number;
}

@Controller('/calculate-total')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async calculateTotalPrice(@Body() body: CalculateTotal) {
    console.log(body);
    try {
      const res = await this.bookingService.calculateTotalPrice(body);
      return {
        success: true,
        message: 'calculation successful',
        data: res,
      };
    } catch (error) {
      console.log(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Unexpected server error');
    }
  }

  @Post('/booking')
  async bookExperience(@Body() body: BookingSchemaType) {
    try {
      const validated = BookingSchema.parse(body);
      const res = await this.bookingService.createBooking(validated);
      return {
        success: true,
        meessage: 'booking created sucessfully',
        data: res,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        throw new BadRequestException({
          success: false,
          type: 'VALIDATION ERROR',
          message: 'Invalid booking data',
          errors: error.issues,
        });
      }
    }
  }
}
