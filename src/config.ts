import { config } from "./deps.ts";

const dotenv = await config();

export const DB_CLUSTER_URL = Deno.env.get("DB_CLUSTER_URL") ||
  dotenv["DB_CLUSTER_URL"];

export const DB_NAME = Deno.env.get("DB_NAME") || dotenv["DB_NAME"];

export const DB_USERNAME = Deno.env.get("DB_USERNAME") || dotenv["DB_USERNAME"];

export const DB_PASSWORD = Deno.env.get("DB_PASSWORD") || dotenv["DB_PASSWORD"];
