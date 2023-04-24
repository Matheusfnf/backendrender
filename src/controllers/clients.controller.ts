import { prisma } from "../config";
import { Request, Response } from "express";

export async function createCustomer(req: Request, res: Response) {
  try {
    const { name, cpf, ie, email, telefone, endereco } = req.body;

    const cpfExists = await prisma.client.findMany({
      
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

    const customer = await prisma.client.create({
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
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar cliente.");
  }
}

export async function getCustomers(req: Request, res: Response) {
  try {
    const customers = await prisma.client.findMany();
    res.status(200).send(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar clientes.");
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Verificar se o cliente existe
    const customer = await prisma.client.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!customer) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    // Excluir o cliente
    await prisma.client.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ message: "Cliente excluído com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao excluir cliente.");
  }
}
