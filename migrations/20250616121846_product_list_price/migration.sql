-- AlterTable
ALTER TABLE "ProductList" ADD COLUMN     "price" DECIMAL(10,2),
ADD COLUMN     "registered_product" BOOLEAN DEFAULT false;
