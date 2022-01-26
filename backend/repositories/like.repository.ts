import { Model } from "../deps.ts";
import { Like } from "../db/linkDb.ts";
import type { ILike } from "../types/types.ts";

export const getUserLikes = async (userId: number): Promise<Model[]> =>
  await Like.where("userId", userId).all();

export const create = async ({ userId, postId }: ILike) => {
  const record: number = await Like.where({ userId: userId, postId: postId })
    .count();
  record
    ? await Like.where({ postId, userId }).delete()
    : await Like.create({ userId, postId });

  return record ? { like: 0 } : { like: 1 };
};
