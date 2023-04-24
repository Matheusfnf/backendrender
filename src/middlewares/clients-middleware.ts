import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

export function validateClientSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map((d) => d.message).join(", ");
      return res.status(400).json({ error: errorMessage });
    }
    next();
  };
}
