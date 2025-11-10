-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "promoCode" TEXT,
    "totalPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Slot_experienceId_date_idx" ON "Slot"("experienceId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Slot_experienceId_date_time_key" ON "Slot"("experienceId", "date", "time");

-- CreateIndex
CREATE INDEX "Booking_slotId_idx" ON "Booking"("slotId");

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
