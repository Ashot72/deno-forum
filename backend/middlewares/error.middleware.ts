import { Context, isHttpError, Status } from "../deps.ts";
import { env } from "../helpers/env.ts";

const errorMiddleware = async (ctx: Context, next: () => Promise<unknown>) => {
  try {
    await next();
  } catch (err) {
    let message = err.message;
    const status = err.status || err.statusCode || Status.InternalServerError;

    if (!isHttpError(err)) {
      if (env("ENV") !== "dev" && env("ENV") !== "development") throw (err);
    }

    ctx.response.status = status;
    ctx.response.body = { status, message };
  }
};

export { errorMiddleware };
