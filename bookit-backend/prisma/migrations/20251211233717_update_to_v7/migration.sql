/*
  Warnings:

  - You are about to drop the column `slotId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `ExperienceSlot` table. All the data in the column will be lost.
  - Added the required column `dateId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_slotId_fkey";

-- DropIndex
DROP INDEX "Booking_slotId_idx";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "slotId",
ADD COLUMN     "dateId" TEXT NOT NULL,
ADD COLUMN     "experienceId" TEXT NOT NULL,
ADD COLUMN     "timeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExperienceSlot" DROP COLUMN "capacity";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "ExperienceDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "ExperienceTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
