import { Forum, Post, Topic } from "../models/index.ts";
import type { IForum } from "../types/types.ts";
//import { db } from "../db/database.ts"

export const getForum = async (id: number): Promise<Forum> =>
  await Forum.find(id);

export const getForums = async (): Promise<Forum | Forum[]> =>
  await Forum.select(
    Forum.field("id"),
    Forum.field("title"),
    Forum.field("description"),
    Forum.field("user_id"),
    Forum.field("created_at"),
    Topic.field("id as topicId"),
    Post.field("id as postId"),
  )
    .leftJoin(Topic, Forum.field("id"), Topic.field("forum_id"))
    .leftJoin(Post, Topic.field("id"), Post.field("topic_id")).get();

export const createForum = async (forum: IForum): Promise<Forum> =>
  await Forum.create(forum);

export const updateForum = async (forum: IForum): Promise<Forum | Forum[]> =>
  await Forum.where("id", forum.id).update(forum);

export const del = async ({ id }: any): Promise<void> => {
  // await db.transaction(async () => {
  await Post.where("forumId", id).delete();
  await Topic.where("forumId", id).delete();
  await Forum.where("id", id).delete();
  // })
};
