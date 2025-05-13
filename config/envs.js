import dotenv from "dotenv";
dotenv.config();

const envs = {
  port: process.env.PORT,
  host_db: process.env.HOST_DB,
  user_db: process.env.USER_DB,
  pass_db: process.env.PASS_DB,
  data_db: process.env.DATA_DB,
};

export { envs };
