import { Context, helpers, isNumber, minLength, required } from "../deps.ts";
import { Forum } from "../models/index.ts";
import { requestValidator, userGuard } from "../middlewares/middleware.ts";
import {
  create,
  del,
  get,
  getSingleForum,
  update,
} from "../services/forum.service.ts";
import type { IForum } from "../types/types.ts";
import { UserRole } from "../enums/enums.ts";

export const getForum = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const res: Forum = await getSingleForum(+id);
  ctx.response.body = res;
};

export const getForums = async (ctx: Context) => {
  const res: Forum | Forum[] = await get();
  ctx.response.body = res;
};

const createForumSchema = {
  userId: [required, isNumber],
  title: [required],
  description: [required, minLength(15)],
};

export const createForum = [
  userGuard(UserRole.ADMIN),
  requestValidator({ bodyRules: createForumSchema }),
  async (ctx: Context) => {
    const data = (await ctx.request.body()).value as Promise<IForum>;
    const res: Forum = await create(await data);
    ctx.response.status = 201;
    ctx.response.body = res;
  },
];

const updateForumSchema = {
  id: [required, isNumber],
  title: [required],
  description: [required, minLength(15)],
};

export const updateForum = [
  userGuard(UserRole.ADMIN),
  requestValidator({ bodyRules: updateForumSchema }),
  async (ctx: Context) => {
    const data = (await ctx.request.body()).value as Promise<IForum>;
    const res: Forum | Forum[] = await update(await data);
    ctx.response.body = res;
  },
];

export const deleteForum = [
  userGuard(UserRole.ADMIN),
  async (ctx: Context) => {
    const data = (await ctx.request.body()).value as Promise<IForum>;
    await del(await data);
    ctx.response.status = 204;
  },
];
