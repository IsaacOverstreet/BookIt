import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [PrismaModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
