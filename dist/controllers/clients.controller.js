"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.getCustomers = exports.createCustomer = void 0;
const config_1 = require("../config");
async function createCustomer(req, res) {
    try {
        const { name, cpf, ie, email, telefone, endereco } = req.body;
        const cpfExists = await config_1.prisma.client.findMany({
            where: {
                cpf: cpf,
            },
            select: {
                cpf: true,
                id: true,
            },
        });
        if (cpfExists.length > 0) {
            return res.status(400).json({ error: "CPF já cadastrado" });
        }
        const customer = await config_1.prisma.client.create({
            data: {
                name,
                cpf,
                ie,
                email,
                telefone,
                endereco,
            },
        });
        res.json(customer);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar cliente.");
    }
}
exports.createCustomer = createCustomer;
async function getCustomers(req, res) {
    try {
        const customers = await config_1.prisma.client.findMany();
        res.status(200).send(customers);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar clientes.");
    }
}
exports.getCustomers = getCustomers;
async function deleteCustomer(req, res) {
    try {
        const { id } = req.params;
        // Verificar se o cliente existe
        const customer = await config_1.prisma.client.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!customer) {
            return res.status(404).json({ error: "Cliente não encontrado" });
        }
        // Excluir o cliente
        await config_1.prisma.client.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json({ message: "Cliente excluído com sucesso" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao excluir cliente.");
    }
}
exports.deleteCustomer = deleteCustomer;
