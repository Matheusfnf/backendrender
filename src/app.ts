import express, { Express } from "express";
import cors from "cors";
import { ClientRouter } from "./routes/clients-router";

import { loadEnv, connectDb, disconnectDB } from "./config";
import { AmostraRouter } from "./routes/amostras-router";
import { TipoAmostraRouter } from "./routes/tipo-amostra";
import { authenticationRouter } from "./routes/authentication-router";
import { usersRouter } from "./routes/users-router";

loadEnv();
const app = express();

// registra as rotas
app.use(express.json());

// configura o CORS
app.use(
  cors({
    origin: "https://frontendrender.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/clientes", ClientRouter);
app.use("/amostras", AmostraRouter);
app.use("/tipoamostra", TipoAmostraRouter);
app.use("/auth", authenticationRouter);
app.use("/users", usersRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB()
}

export default app;
