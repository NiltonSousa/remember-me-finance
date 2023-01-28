/*
  Warnings:

  - Changed the type of `expireDate` on the `Bill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "expireDate",
ADD COLUMN     "expireDate" TIMESTAMP(3) NOT NULL;
