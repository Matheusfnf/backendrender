/*
  Warnings:

  - Added the required column `ufcbolor` to the `identAmostra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ufccoliformes` to the `identAmostra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ufcmicroorganismo` to the `identAmostra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "identAmostra" ADD COLUMN     "ufcbolor" TEXT NOT NULL,
ADD COLUMN     "ufccoliformes" TEXT NOT NULL,
ADD COLUMN     "ufcmicroorganismo" TEXT NOT NULL;
