import pgk from "pg";
import { envs } from "../envs.js";

const { Pool } = pgk;

const pool = new Pool({
  host: envs.host_db,
  user: envs.user_db,
  password: envs.pass_db,
  database: envs.data_db,
  allowExitOnIdle: true,
});

pool
  .connect()
  .then(() => console.log(" Conectado a PostgreSQL correctamente"))
  .catch((err) => {
    console.error(" Error al conectar a PostgreSQL:", err);
    process.exit(1);
  });

export default pool;
