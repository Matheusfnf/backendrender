"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.init = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const clients_router_1 = require("./routes/clients-router");
const config_1 = require("./config");
const amostras_router_1 = require("./routes/amostras-router");
const tipo_amostra_1 = require("./routes/tipo-amostra");
const authentication_router_1 = require("./routes/authentication-router");
const users_router_1 = require("./routes/users-router");
const pdf_Router_1 = require("routes/pdf-Router");
(0, config_1.loadEnv)();
const app = (0, express_1.default)();
// registra as rotas
app.use(express_1.default.json());
// configura o CORS
const allowedOrigins = [
    "https://frontendrender.vercel.app",
    "http://localhost:3000",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use("/clientes", clients_router_1.ClientRouter);
app.use("/amostras", amostras_router_1.AmostraRouter);
app.use("/tipoamostra", tipo_amostra_1.TipoAmostraRouter);
app.use("/auth", authentication_router_1.authenticationRouter);
app.use("/users", users_router_1.usersRouter);
app.use("/amostras/pdf", pdf_Router_1.pdfRouter);
function init() {
    (0, config_1.connectDb)();
    return Promise.resolve(app);
}
exports.init = init;
async function close() {
    await (0, config_1.disconnectDB)();
}
exports.close = close;
exports.default = app;
