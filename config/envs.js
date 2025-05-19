import dotenv from "dotenv";
dotenv.config();

const envs = {
  port: process.env.PORT,
  host_db: process.env.HOST_DB,
  user_db: process.env.USER_DB,
  pass_db: process.env.PASS_DB,
  data_db: process.env.DATA_DB,
  host_db_prod: process.env.HOST_DB_PROD,
  user_db_prod: process.env.USER_DB_PROD,
  pass_db_prod: process.env.PASS_DB_PROD,
  data_db_prod: process.env.DATA_DB_PROD,
  databaseUrl: process.env.DATABASE_URL,
};

export { envs };
