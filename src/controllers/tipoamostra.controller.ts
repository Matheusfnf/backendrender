import { prisma } from "../config";
import { Request, Response } from "express";

export async function getTipoAmostra(req: Request, res: Response) {
  try {
    const tipoamostra = await prisma.identAmostra.findMany();
    res.status(200).send(tipoamostra);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar amostra");
  }
}

export async function createTipoAmostra(req: Request, res: Response) {
  try {
    const {
      codigo,
      fabricacao,
      vencimento,
      microorganismo,
      produtocultura,
      preco,
    } = req.body;

    const amostra = await prisma.identAmostra.create({
      data: {
        codigo,
        fabricacao,
        vencimento,
        microorganismo,
        produtocultura,
        preco,
      },
    });

    res.json(amostra);
    console.log(amostra);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar amostra");
  }
}

export async function updateFinalResults(req: Request, res: Response) {
  try {
    const { id, identId } = req.params;
    const { ufcmicroorganismo, ufccoliformes, ufcbolor } = req.body;

    const result = await prisma.identAmostra.update({
      where: { id: Number(identId) },
      data: {
        ufcmicroorganismo,
        ufccoliformes,
        ufcbolor,
      },
    });

    res.json(result);
    console.log(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar identAmostra");
  }
}




