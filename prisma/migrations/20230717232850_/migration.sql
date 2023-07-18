/*
  Warnings:

  - A unique constraint covering the columns `[cartItemID]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_cartItemID_key" ON "Product"("cartItemID");
