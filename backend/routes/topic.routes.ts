import {
  Context,
  helpers,
  httpErrors,
  isNumber,
  minLength,
  required,
} from "../deps.ts";
import { Topic } from "../models/index.ts";
import { requestValidator, userGuard } from "../middlewares/middleware.ts";
import {
  create,
  del,
  get,
  getByForumId,
  update,
} from "../services/topic.service.ts";
import type { ITopic } from "../types/types.ts";
import { UserRole } from "../enums/enums.ts";
import { userHasRole } from "../helpers/roles.ts";

export const getTopic = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const res: Topic = await get(+id);
  ctx.response.body = res;
};

export const getTopicsByForumId = async (ctx: Context) => {
  const { fid } = helpers.getQuery(ctx, { mergeParams: true });
  const res: Topic | Topic[] = await getByForumId(+fid);
  ctx.response.body = res;
};

const createTopicSchema = {
  userId: [required, isNumber],
  forumId: [required, isNumber],
  title: [required],
  description: [required, minLength(15)],
};

export const createTopic = [
  userGuard(UserRole.USER),
  requestValidator({ bodyRules: createTopicSchema }),
  async (ctx: Context) => {
    const data = (await ctx.request.body()).value as Promise<ITopic>;
    const res: Topic = await create(await data);
    ctx.response.status = 201;
    ctx.response.body = res;
  },
];

const updateTopicSchema = {
  id: [required, isNumber],
  title: [required],
  description: [required, minLength(15)],
};

export const updateTopic = [
  userGuard(),
  requestValidator({ bodyRules: updateTopicSchema }),
  async (ctx: Context) => {
    const data = (await ctx.request.body()).value as Promise<ITopic>;
    const user = ctx.state.user;

    if (user) {
      const topic = await data;
      if (topic.userId === user.id || userHasRole(user, UserRole.ADMIN)) {
        const res: Topic | Topic[] = await update(topic);
        ctx.response.body = res;
        return;
      }
    }

    throw new httpErrors.Forbidden("Forbidden user role");
  },
];

export const updateView = async (ctx: Context) => {
  const data = (await ctx.request.body()).value as Promise<ITopic>;
  const res: Topic | Topic[] = await update(await data);
  ctx.response.body = res;
};

export const deleteTopic = [
  userGuard(UserRole.ADMIN),
  async (ctx: Context) => {
    const data = (await ctx.request.body()).value as Promise<ITopic>;
    await del(await data);
    ctx.response.status = 204;
  },
];
