import { Post } from "../models/index.ts";
import type { IPost } from "../types/types.ts";
import * as postRepo from "../repositories/post.repository.ts";

export const getByTopicId = async (
  topicId: number,
  offset: number,
  limit: number,
): Promise<{ posts: (Post | Post[]); count: number; likes: any }> =>
  await postRepo.getPostsByTopicId(topicId, offset, limit);

export const create = async (post: IPost): Promise<Post> => await postRepo.createPost(post);

export const update = async (topic: IPost): Promise<Post | Post[]> => await postRepo.updatePost(topic);

export const del = async ({ id }: IPost): Promise<Post | Post[]> => await postRepo.del(id);
