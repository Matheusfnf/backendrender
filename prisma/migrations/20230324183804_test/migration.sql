/*
  Warnings:

  - A unique constraint covering the columns `[tipoAmostra_id]` on the table `amostra` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "amostra" ADD COLUMN     "tipoAmostra_id" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "amostra_tipoAmostra_id_key" ON "amostra"("tipoAmostra_id");
