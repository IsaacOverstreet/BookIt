import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { PromoService } from './promo.service';
import {
  ApplyPromoSchema,
  type ApplyPromoSchemaType,
} from '../../lib/validator';
import { ZodError } from 'zod';

@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}
  @Post('/promo-code')
  async applyPromoCode(@Body() body: ApplyPromoSchemaType) {
    try {
      const validated = ApplyPromoSchema.parse(body);
      const res = await this.promoService.applypromo(validated);
      return {
        success: true,
        message: 'promo applied sucessfully',
        data: res,
      };
    } catch (error) {
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
