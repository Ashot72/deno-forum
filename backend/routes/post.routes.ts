import {
  Context,
  helpers,
  httpErrors,
  isNumber,
  minLength,
  required,
} from "../deps.ts";
import { Post } from "../models/index.ts";
import { requestValidator, userGuard } from "../middlewares/middleware.ts";
import { create, del, getByTopicId, update } from "../services/post.service.ts";
import type { IPost } from "../types/types.ts";
import { UserRole } from "../enums/enums.ts";
import { userHasRole } from "../helpers/roles.ts";

export const getPostsByTopicId = async (ctx: Context) => {
  const { tid, offset, limit } = helpers.getQuery(ctx, { mergeParams: true });
  const res: { posts: (Post | Post[]); count: number; likes: any } =
    await getByTopicId(+tid, +offset, +limit);
  ctx.response.body = res;
};

const createPostSchema = {
  userId: [required, isNumber],
  forumId: [required, isNumber],
  topicId: [required, isNumber],
  title: [required],
  description: [required, minLength(15)],
};

export const createPost = [
  userGuard(UserRole.USER),
  requestValidator({ bodyRules: createPostSchema }),
  async (ctx: Context) => {
    const data = (await ctx.request.body()).value as Promise<IPost>;
    const res: Post = await create(await data);
    ctx.response.status = 201;
    ctx.response.body = res;
  },
];

const updatePostSchema = {
  id: [required, isNumber],
  title: [required],
  description: [required, minLength(15)],
};

export const updatePost = [
  userGuard(),
  requestValidator({ bodyRules: updatePostSchema }),
  async (ctx: Context) => {
    const data = (await ctx.request.body()).value as Promise<IPost>;
    const user = ctx.state.user;

    if (user) {
      const post = await data;
      if (post.userId === user.id || userHasRole(user, UserRole.ADMIN)) {
        const res: Post | Post[] = await update(post);
        ctx.response.body = res;
        return;
      }
    }

    throw new httpErrors.Forbidden("Forbidden user role");
  },
];

export const deletePost = [
  userGuard(),
  async (ctx: Context) => {
    const data = (await ctx.request.body()).value as Promise<IPost>;
    const user = ctx.state.user;

    if (user) {
      const post = await data;
      if (post.userId === user.id || userHasRole(user, UserRole.ADMIN)) {
        await del(post);
        ctx.response.status = 204;
        return;
      }
    }

    throw new httpErrors.Forbidden("Forbidden user role");
  },
];
