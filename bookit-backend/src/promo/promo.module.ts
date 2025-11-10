import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PromoController],
  providers: [PromoService],
})
export class PromoModule {}
