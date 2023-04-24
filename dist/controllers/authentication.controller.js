"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singInPost = void 0;
const authentication_service_1 = __importDefault(require("@/services/authentication-service"));
async function singInPost(req, res) {
    const { email, password } = req.body;
    try {
        const result = await authentication_service_1.default.signIn({ email, password });
        return res.status(200).send(result);
    }
    catch (error) {
        return res.status(401).send({});
    }
}
exports.singInPost = singInPost;
