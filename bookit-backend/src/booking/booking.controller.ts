import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import {
  BookingSchema,
  type PreviewCalcuateSchemaType,
  type BookingSchemaType,
  PreviewSchema,
} from '../../lib/validator';
import { BookingService } from './booking.service';
import { ZodError } from 'zod';

@Controller('/calculate-total')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async calculateTotalPrice(@Body() body: PreviewCalcuateSchemaType) {
    console.log(body);
    try {
      const validated = PreviewSchema.parse(body);
      const res = await this.bookingService.calculateTotalPrice(validated);
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

  //create a new booking
  @Post('/booking')
  async bookExperience(@Body() body: BookingSchemaType) {
    try {
      const validated = BookingSchema.parse(body);
      const res = await this.bookingService.createBooking(validated);
      return {
        success: true,
        message: 'booking created sucessfully',
        data: res,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const messages = error.issues.map((err) => err.message);
        throw new BadRequestException(messages);
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Unexpected server error');
    }
  }
}
