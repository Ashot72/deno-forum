import { Context } from "../deps.ts";
import { IUser } from "../types/types.ts";
import { getJwtPayload } from "../helpers/jwt.ts";

const JWTAuthMiddleware = () => {
  return async (ctx: Context, next: () => Promise<unknown>) => {
    try {
      const authHeader = ctx.request.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace(/^bearer/i, "").trim();
        const user = await getJwtPayload({ refresh_token: token });

        if (user) {
          ctx.state.user = <IUser> user;
        }
      }
    } catch (err) {}

    await next();
  };
};

export { JWTAuthMiddleware };
