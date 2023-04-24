"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFinalResults = exports.createTipoAmostra = exports.getTipoAmostra = void 0;
const config_1 = require("../config");
async function getTipoAmostra(req, res) {
    try {
        const tipoamostra = await config_1.prisma.identAmostra.findMany();
        res.status(200).send(tipoamostra);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar amostra");
    }
}
exports.getTipoAmostra = getTipoAmostra;
async function createTipoAmostra(req, res) {
    try {
        const { codigo, fabricacao, vencimento, microorganismo, produtocultura, preco, } = req.body;
        const amostra = await config_1.prisma.identAmostra.create({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar amostra");
    }
}
exports.createTipoAmostra = createTipoAmostra;
async function updateFinalResults(req, res) {
    try {
        const { id, identId } = req.params;
        const { ufcmicroorganismo, ufccoliformes, ufcbolor } = req.body;
        const result = await config_1.prisma.identAmostra.update({
            where: { id: Number(identId) },
            data: {
                ufcmicroorganismo,
                ufccoliformes,
                ufcbolor,
            },
        });
        res.json(result);
        console.log(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar identAmostra");
    }
}
exports.updateFinalResults = updateFinalResults;
