import { Context, isEmail, isIn, lengthBetween, required } from "../deps.ts";
import { User } from "../models/index.ts";
import { requestValidator } from "../middlewares/middleware.ts";
import { loginUser, registerUser } from "../services/user.service.ts";
import type { IUser } from "../types/types.ts";

const loginSchema = {
  email: [required, isEmail],
  password: [required, lengthBetween(4, 15)],
};

export const login = [
  requestValidator({ bodyRules: loginSchema }),
  async (ctx: Context) => {
    const data = (await ctx.request.body()).value as Promise<IUser>;
    const tokens: { access_token: string; refresh_token: string } =
      await loginUser(await data);
    ctx.response.body = tokens;
  },
];

const registerSchema = {
  email: [required, isEmail],
  password: [required, lengthBetween(4, 15)],
  role: [required, isIn(["User", "Admin"])],
};

export const register = [
  requestValidator({ bodyRules: registerSchema }),
  async (ctx: Context) => {
    const data = (await ctx.request.body()).value as Promise<IUser>;
    const res: User = await registerUser(await data);
    ctx.response.status = 201;
    ctx.response.body = res;
  },
];
