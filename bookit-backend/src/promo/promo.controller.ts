import { Body, Controller, Post } from '@nestjs/common';
import { PromoService } from './promo.service';
import {
  ApplyPromoSchema,
  type ApplyPromoSchemaType,
} from '../../lib/validator';

@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}
  @Post('/promo-code')
  async applyPromoCode(@Body() body: ApplyPromoSchemaType) {
    const validated = ApplyPromoSchema.parse(body);

    const res = await this.promoService.applypromo(validated);
    return {
      success: true,
      message: 'promo applied sucessfully',
      data: res,
    };
  }
}
