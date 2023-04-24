-- CreateTable
CREATE TABLE "amostra" (
    "id" SERIAL NOT NULL,
    "fazenda" TEXT NOT NULL,
    "quemColetou" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "entradaNoLab" TEXT NOT NULL,
    "datadaColeta" TEXT NOT NULL,
    "temperatura" TEXT NOT NULL,
    "entreguePor" TEXT NOT NULL,
    "Ocorrencias" TEXT NOT NULL,

    CONSTRAINT "amostra_pkey" PRIMARY KEY ("id")
);
