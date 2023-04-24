-- CreateTable
CREATE TABLE "tipoAmostra" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "fabricacao" TEXT NOT NULL,
    "vencimento" TEXT NOT NULL,
    "microorganismo" TEXT NOT NULL,
    "produtocultura" TEXT NOT NULL,
    "preco" TEXT NOT NULL,

    CONSTRAINT "tipoAmostra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_amostra_tipo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tipoAmostra_codigo_key" ON "tipoAmostra"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "_amostra_tipo_AB_unique" ON "_amostra_tipo"("A", "B");

-- CreateIndex
CREATE INDEX "_amostra_tipo_B_index" ON "_amostra_tipo"("B");

-- AddForeignKey
ALTER TABLE "_amostra_tipo" ADD CONSTRAINT "_amostra_tipo_A_fkey" FOREIGN KEY ("A") REFERENCES "amostra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_amostra_tipo" ADD CONSTRAINT "_amostra_tipo_B_fkey" FOREIGN KEY ("B") REFERENCES "tipoAmostra"("id") ON DELETE CASCADE ON UPDATE CASCADE;
