// deno install -qAf --unstable https://raw.githubusercontent.com/denosaurs/denon/main/denon.ts
import { Application, Context, oakCors } from "./deps.ts";
import * as middlewares from "./middlewares/middleware.ts";
import api from "./routes/api.routes.ts";
import { db } from "./db/database.ts";
import { link } from "./db/linkDb.ts";
import { env } from "./helpers/env.ts";

link(db);

const app = new Application<Context>();

app.use(oakCors());
app.use(middlewares.errorMiddleware);
app.use(middlewares.JWTAuthMiddleware());
app.use(api.routes());

app.addEventListener(
  "listen",
  ({ hostname, port, secure }) =>
    console.log(`Listening on: ${secure ? "https://" : "http://"}
                               ${hostname ?? "localhost"}:
                               ${port}`),
);

app.addEventListener("error", (e) => console.log(e.error));

const DEFAULT_PORT = +env("SERVER_PORT");
const envPort = Deno.env.get("PORT");
const port = envPort ? +envPort : DEFAULT_PORT;

console.log("PORT:", port)
await app.listen({ port });
