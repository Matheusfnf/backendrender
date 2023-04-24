import { prisma } from "../config";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";


export async function getAmostra(req: AuthenticatedRequest, res: Response) {
  const {userId} = req;
  try {
    const amostras = await prisma.amostra.findMany({
      where: {
        cliente_id: userId,
      },
      include: {
        identAmostra: true,
        cliente: true,
      },
    });
    res.status(200).send(amostras);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar amostras.");
  }
}

export async function createAmostra(req: Request, res: Response) {
  try {
    const {
      cliente,
      fazenda,
      quemColetou,
      municipio,
      estado,
      entradaNoLab,
      datadaColeta,
      temperatura,
      entreguePor,
      Ocorrencias,
      identAmostra,
      comercial,
      onFarm,
      viabilidadeEmAgua,
      contagemDeConidios,
      contaminantes,
      ph,
      agua,
      solo,
    } = req.body;

    const amostra = await prisma.amostra.create({
      data: {
        cliente: { connect: { id: cliente } },
        fazenda,
        quemColetou,
        municipio,
        estado,
        entradaNoLab,
        datadaColeta,
        temperatura,
        entreguePor,
        Ocorrencias,
        comercial,
        onFarm,
        viabilidadeEmAgua,
        contagemDeConidios,
        contaminantes,
        ph,
        agua,
        solo,
        identAmostra: {
          create: identAmostra.map(
            (ident: {
              codigo: any;
              fabricacao: any;
              vencimento: any;
              microorganismo: any;
              produtocultura: any;
              preco: any;
            }) => ({
              codigo: ident.codigo,
              fabricacao: ident.fabricacao,
              vencimento: ident.vencimento,
              microorganismo: ident.microorganismo,
              produtocultura: ident.produtocultura,
              preco: ident.preco,
            })
          ),
        },
      },
      include: {
        identAmostra: true,
      },
    });

    res.json(amostra);
    console.log(amostra);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar amostra");
  }
}
