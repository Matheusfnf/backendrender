/*
  Warnings:

  - You are about to drop the column `tipoAmostra_id` on the `amostra` table. All the data in the column will be lost.
  - You are about to drop the `_amostra_tipo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipoAmostra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_amostra_tipo" DROP CONSTRAINT "_amostra_tipo_A_fkey";

-- DropForeignKey
ALTER TABLE "_amostra_tipo" DROP CONSTRAINT "_amostra_tipo_B_fkey";

-- DropIndex
DROP INDEX "amostra_tipoAmostra_id_key";

-- AlterTable
ALTER TABLE "amostra" DROP COLUMN "tipoAmostra_id";

-- DropTable
DROP TABLE "_amostra_tipo";

-- DropTable
DROP TABLE "tipoAmostra";

-- CreateTable
CREATE TABLE "identAmostra" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "fabricacao" TEXT NOT NULL,
    "vencimento" TEXT NOT NULL,
    "microorganismo" TEXT NOT NULL,
    "produtocultura" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "amostra_id" INTEGER,

    CONSTRAINT "identAmostra_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "identAmostra_codigo_key" ON "identAmostra"("codigo");

-- AddForeignKey
ALTER TABLE "identAmostra" ADD CONSTRAINT "identAmostra_amostra_id_fkey" FOREIGN KEY ("amostra_id") REFERENCES "amostra"("id") ON DELETE SET NULL ON UPDATE CASCADE;
