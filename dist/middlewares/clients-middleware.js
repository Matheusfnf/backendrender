"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClientSchema = void 0;
function validateClientSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errorMessage = error.details.map((d) => d.message).join(", ");
            return res.status(400).json({ error: errorMessage });
        }
        next();
    };
}
exports.validateClientSchema = validateClientSchema;
