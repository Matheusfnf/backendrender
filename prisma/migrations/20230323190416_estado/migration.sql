/*
  Warnings:

  - Added the required column `clienteId` to the `amostra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `amostra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "amostra" ADD COLUMN     "clienteId" INTEGER NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "amostra" ADD CONSTRAINT "amostra_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
