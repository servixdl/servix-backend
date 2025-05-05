import dotenv from "dotenv";
dotenv.config();

const envs = {
  port: process.env.PORT,
  host_db: process.env.DB_HOST,
  user_db: process.env.DB_USER,
  pass_db: process.env.DB_PASS,
  data_db: process.env.DB_DATA,
};

export { envs };
