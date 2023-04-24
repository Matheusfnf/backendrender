/*
  Warnings:

  - You are about to drop the column `cliente` on the `amostra` table. All the data in the column will be lost.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "amostra" DROP COLUMN "cliente",
ADD COLUMN     "cliente_id" INTEGER;

-- DropTable
DROP TABLE "client";

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "ie" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "endereco" TEXT,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "amostra" ADD CONSTRAINT "amostra_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
