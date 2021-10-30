import app from "./app.ts";
import output from "./utils/output.ts";

import { Command } from "./deps.ts";

const program = new Command();
program
  .option<string>(
    "-p, --port <number>",
    "specify the port that provides HTTP services",
  )
  .parse(Deno.args);

const port = program._getOptionValue("port") as string ?? "80";
const parsedPort = parseInt(port);

if (isNaN(parsedPort)) {
  output.error(`Invalid port: ${port}(type: ${typeof port})`);
  Deno.exit(-1);
}

app.listen(`:${parsedPort}`)
output.info(`Listening on port ${parsedPort}...`);
