/*
  Warnings:

  - You are about to drop the `Slot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tax` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_slotId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Slot" DROP CONSTRAINT "Slot_experienceId_fkey";

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "public"."Slot";

-- CreateTable
CREATE TABLE "ExperienceDate" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "experienceId" TEXT NOT NULL,

    CONSTRAINT "ExperienceDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceTime" (
    "id" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "dateId" TEXT NOT NULL,

    CONSTRAINT "ExperienceTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceSlot" (
    "id" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "timeId" TEXT NOT NULL,

    CONSTRAINT "ExperienceSlot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExperienceDate" ADD CONSTRAINT "ExperienceDate_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceTime" ADD CONSTRAINT "ExperienceTime_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "ExperienceDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceSlot" ADD CONSTRAINT "ExperienceSlot_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "ExperienceTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "ExperienceSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
