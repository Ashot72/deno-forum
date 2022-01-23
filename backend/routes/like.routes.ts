import { Context, helpers, isNumber, Model, required } from "../deps.ts";
import { create, get } from "../services/like.service.ts";
import { requestValidator, userGuard } from "../middlewares/middleware.ts";
import { UserRole } from "../enums/enums.ts";

export const getUserLikes = async (ctx: Context) => {
  const { uId } = helpers.getQuery(ctx, { mergeParams: true });
  const res: Model | Model[] = await get(+uId);
  ctx.response.body = res;
};

const likeSchema = {
  userId: [required, isNumber],
  postId: [required, isNumber],
};

export const createLike = [
  userGuard(UserRole.USER),
  requestValidator({ bodyRules: likeSchema }),
  async (ctx: Context) => {
    const data = (await ctx.request.body()).value;
    const res = await create(await data);
    ctx.response.body = res;
  },
];
