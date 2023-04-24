/*
  Warnings:

  - You are about to drop the `cliente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "amostra" DROP CONSTRAINT "amostra_cliente_id_fkey";

-- DropTable
DROP TABLE "cliente";

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "ie" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "endereco" TEXT,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "amostra" ADD CONSTRAINT "amostra_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
