/*
  Warnings:

  - A unique constraint covering the columns `[cartItemID]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cartItemID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_cartItemID_key" ON "Product"("cartItemID");
