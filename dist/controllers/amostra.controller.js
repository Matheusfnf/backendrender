"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAmostra = exports.deleteAmostra = exports.getAmostra = void 0;
const config_1 = require("../config");
async function getAmostra(req, res) {
    const { userId } = req;
    try {
        const amostras = await config_1.prisma.amostra.findMany({
            where: {
                cliente_id: userId,
            },
            include: {
                identAmostra: true,
                cliente: true,
            },
        });
        res.status(200).send(amostras);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar amostras.");
    }
}
exports.getAmostra = getAmostra;
async function deleteAmostra(req, res) {
    try {
        const { amostraId } = req.params;
        const amostra = await config_1.prisma.amostra.findUnique({
            where: {
                id: parseInt(amostraId),
            },
        });
        if (!amostra) {
            res.status(404).send("Amostra não encontrada.");
            return;
        }
        await config_1.prisma.amostra.delete({
            where: {
                id: parseInt(amostraId),
            },
        });
        res.status(200).send("Amostra deletada com sucesso.");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao deletar amostra.");
    }
}
exports.deleteAmostra = deleteAmostra;
async function createAmostra(req, res) {
    try {
        const { cliente, fazenda, quemColetou, municipio, estado, entradaNoLab, datadaColeta, temperatura, entreguePor, Ocorrencias, identAmostra, comercial, onFarm, viabilidadeEmAgua, contagemDeConidios, contaminantes, ph, agua, solo, } = req.body;
        const amostra = await config_1.prisma.amostra.create({
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
                    create: identAmostra.map((ident) => ({
                        codigo: ident.codigo,
                        fabricacao: ident.fabricacao,
                        vencimento: ident.vencimento,
                        microorganismo: ident.microorganismo,
                        produtocultura: ident.produtocultura,
                        preco: ident.preco,
                    })),
                },
            },
            include: {
                identAmostra: true,
            },
        });
        res.json(amostra);
        console.log(amostra);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar amostra");
    }
}
exports.createAmostra = createAmostra;
