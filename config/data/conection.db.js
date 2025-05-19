import pgk from "pg";
import { envs } from "../envs.js";

const { Pool } = pgk;

let poolConfig;

if (process.env.NODE_ENV === "production") {
  poolConfig = {
    host: envs.host_db_prod,
    user: envs.user_db_prod,
    password: envs.pass_db_prod,
    database: envs.data_db_prod,
    allowExitOnIdle: true,
    // ssl: { rejectUnauthorized: false },
  };
} else {
  poolConfig = {
    host: envs.host_db,
    user: envs.user_db,
    password: envs.pass_db,
    database: envs.data_db,
    allowExitOnIdle: true,
  };
}

const pool = new Pool(poolConfig);

pool
  .connect()
  .then(() => console.log(" Conectado a PostgreSQL correctamente"))
  .catch((err) => {
    console.error(" Error al conectar a PostgreSQL:", err);
    process.exit(1);
  });

export default pool;
