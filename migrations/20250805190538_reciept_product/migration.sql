-- DropForeignKey
ALTER TABLE "ProductReciept" DROP CONSTRAINT "ProductReciept_product_id_fkey";

-- AddForeignKey
ALTER TABLE "ProductReciept" ADD CONSTRAINT "ProductReciept_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductSupermarket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
