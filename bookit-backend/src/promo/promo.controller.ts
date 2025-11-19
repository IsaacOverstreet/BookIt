import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { PromoService } from './promo.service';
import { PreviewSchema, type PreviewSchemaType } from '../../lib/validator';
import { ZodError } from 'zod';

@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}
  @Post('/promo-code')
  async applyPromoCode(@Body() body: PreviewSchemaType) {
    // try {
    //   const validated = PreviewSchema.parse(body);
    //   const res = await this.promoService.applypromo(validated);
    //   return {
    //     success: true,
    //     meessage: 'promo applied sucessfully',
    //     data: res,
    //   };
    // } catch (error) {
    //   if (error instanceof ZodError) {
    //     throw new BadRequestException({
    //       success: false,
    //       type: 'VALIDATION ERROR',
    //       message: 'Invalid booking data',
    //       errors: error.issues,
    //     });
    //   }
    //   throw new BadRequestException({
    //     success: false,
    //     type: 'UNKNOWN_ERROR',
    //     message: 'Something went wrong',
    //   });
    // }
  }
}
