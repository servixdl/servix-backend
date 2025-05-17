import dotenv from "dotenv";
dotenv.config();
import bodyParser from 'body-parser';

import express from "express";
import { envs } from "./config/envs.js";
import { findError } from "./src/utils/find.error.utils.js";
import cors from "cors";
import routes from "./routes/routes.js";

const app = express();
const port = envs.port;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use("/", routes);

export default app;
if(process.env.NODE_ENV !== 'test'){
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
}