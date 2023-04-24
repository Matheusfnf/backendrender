/*
  Warnings:

  - You are about to drop the column `clienteId` on the `amostra` table. All the data in the column will be lost.
  - Added the required column `cliente` to the `amostra` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "amostra" DROP CONSTRAINT "amostra_clienteId_fkey";

-- AlterTable
ALTER TABLE "amostra" DROP COLUMN "clienteId",
ADD COLUMN     "cliente" TEXT NOT NULL;
