-- CreateTable
CREATE TABLE "Supermarket" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "coords" DOUBLE PRECISION[],

    CONSTRAINT "Supermarket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wholesale" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "min_quantity" DECIMAL(12,4) NOT NULL,
    "price" DECIMAL(10,4) NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "Wholesale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSupermarket" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unity" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "barcode" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "last_update" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "supermarket_id" TEXT NOT NULL,

    CONSTRAINT "ProductSupermarket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductList" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unity" TEXT,
    "quantity" DECIMAL(10,4) NOT NULL,
    "list_id" TEXT NOT NULL,
    "product_id" TEXT,
    "supermarket_id" TEXT,

    CONSTRAINT "ProductList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reciept" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL,
    "supermarket_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Reciept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductReciept" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "quantity" DECIMAL(12,4) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2),
    "receipt_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "ProductReciept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wholesale_product_id_key" ON "Wholesale"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Wholesale" ADD CONSTRAINT "Wholesale_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductSupermarket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSupermarket" ADD CONSTRAINT "ProductSupermarket_supermarket_id_fkey" FOREIGN KEY ("supermarket_id") REFERENCES "Supermarket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductList" ADD CONSTRAINT "ProductList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductSupermarket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductList" ADD CONSTRAINT "ProductList_supermarket_id_fkey" FOREIGN KEY ("supermarket_id") REFERENCES "Supermarket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductList" ADD CONSTRAINT "ProductList_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reciept" ADD CONSTRAINT "Reciept_supermarket_id_fkey" FOREIGN KEY ("supermarket_id") REFERENCES "Supermarket"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reciept" ADD CONSTRAINT "Reciept_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReciept" ADD CONSTRAINT "ProductReciept_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "Reciept"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReciept" ADD CONSTRAINT "ProductReciept_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductSupermarket"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
