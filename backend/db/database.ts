import { Database, MySQLConnector } from "../deps.ts";
import { env } from "../helpers/env.ts";

const connector = new MySQLConnector({
  host: env("DB_HOST"),
  username: env("DB_USER"),
  password: env("DB_PASS"),
  database: env("DB_NAME"),
});
const db = new Database(connector);

export { db };
