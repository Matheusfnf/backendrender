import { client } from "@prisma/client";
import Joi from "joi";

export const ClientSchema = Joi.object<any>({
  name: Joi.string().required(),
  cpf: Joi.string().required(),
  ie: Joi.string().required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().required(),
  endereco: Joi.string().required(),
});
