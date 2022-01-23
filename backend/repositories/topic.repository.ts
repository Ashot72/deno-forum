import { Forum, Post, Topic, User } from "../models/index.ts";
import type { ITopic } from "../types/types.ts";
//import { db } from "../db/database.ts"

export const getTopic = async (id: number): Promise<Topic> =>
  await Topic.find(id);

export const getTopicsByForumId = async (
  forumId: number,
): Promise<Topic | Topic[]> =>
  await Topic.where(Topic.field("forum_id"), forumId).select(
    Topic.field("id"),
    Topic.field("title"),
    Topic.field("description"),
    Topic.field("view"),
    Topic.field("user_id"),
    Topic.field("created_at"),
    Topic.field("updated_at"),
    Post.field("id as postId"),
    User.field("email"),
  )
    .leftJoin(Post, Topic.field("id"), Post.field("topic_id"))
    .join(User, Topic.field("user_id"), User.field("id")).get();

export const createTopic = async (topic: ITopic): Promise<Topic> =>
  await Topic.create(topic);

export const updateTopic = async (topic: ITopic): Promise<Topic | Topic[]> =>
  await Topic.where("id", topic.id).update(topic);

export const del = async ({ id }: any): Promise<void> => {
  // await db.transaction(async () => {
  await Post.where("topicId", id).delete();
  await Topic.where("id", id).delete();
  // })
};
