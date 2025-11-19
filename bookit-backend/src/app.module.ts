import { Module } from '@nestjs/common';

import { ExperiencesModule } from './experiences/experiences.module';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { BookingModule } from './booking/booking.module';
import { PromoController } from './promo/promo.controller';
import { PromoService } from './promo/promo.service';
import { PromoModule } from './promo/promo.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ExperiencesController } from './experiences/experiences.controller';
import { ExperiencesService } from './experiences/experiences.service';

@Module({
  imports: [ExperiencesModule, BookingModule, PromoModule, PrismaModule],
  controllers: [BookingController, PromoController],
  providers: [BookingService, PromoService, PrismaService],
})
export class AppModule {}
