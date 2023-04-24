"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singInPost = void 0;
const authentication_service_1 = __importDefault(require("../services/authentication-service"));
const http_status_1 = __importDefault(require("http-status"));
async function singInPost(req, res) {
    const { email, password } = req.body;
    try {
        const result = await authentication_service_1.default.signIn({ email, password });
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_1.default.UNAUTHORIZED).send({ error: error });
    }
}
exports.singInPost = singInPost;
