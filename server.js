import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { envs } from "./config/envs.js";
import { findError } from "./src/utils/find.error.utils.js";
import cors from "cors";
import routes from "./src/routes/routes.js";

const app = express();
const port = envs.port;

app.use(cors());
app.use(express.json());
app.use("/", routes);
try {
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
  });
} catch (error) {
  const customError = findError("500");
  console.error(`Error al iniciar el servidor: ${customError.message}`);
  console.error(error);
  process.exit(1);
}
