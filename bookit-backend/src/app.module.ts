import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperiencesModule } from './experiences/experiences.module';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { BookingModule } from './booking/booking.module';
import { PromoController } from './promo/promo.controller';
import { PromoService } from './promo/promo.service';
import { PromoModule } from './promo/promo.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ExperiencesModule, BookingModule, PromoModule, PrismaModule],
  controllers: [AppController, BookingController, PromoController],
  providers: [AppService, BookingService, PromoService, PrismaService],
})
export class AppModule {}
