import { MongoClient } from "../deps.ts";
import {
  DB_CLUSTER_URL,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
} from "../config.ts";
import output from "../util/output.ts";

const client = new MongoClient();

output.info(`Connecting to MongoDB...`);
const db = await client.connect(
  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`,
);

export default db;
