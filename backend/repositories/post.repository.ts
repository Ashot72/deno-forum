import { Post, User } from "../models/index.ts";
import type { IPost } from "../types/types.ts";
import { db } from "../db/database.ts";
import { Like } from "../db/linkDb.ts";

export const getPostsByTopicId = async (
  topicId: number,
  skip: number,
  limit: number,
): Promise<{ posts: (Post | Post[]); count: number; likes: any }> => {
  const posts: Post | Post[] = await Post.where("topic_id", topicId)
    .select(
      Post.field("id"),
      Post.field("title"),
      Post.field("description"),
      Post.field("user_id"),
      Post.field("created_at"),
      Post.field("updated_at"),
      User.field("email"),
    )
    .join(User, Post.field("user_id"), User.field("id"))
    .orderBy('id', 'asc')
    .skip(skip).limit(limit).all();

  const postIds: string[] = posts.map((post) => post.id!.toString());
  const likes = await db.query({
    schema: Like,
    table: "post_user",
    whereIn: { field: "post_id", possibleValues: postIds },
  });

  const count = await Post.where("topic_id", topicId).count();

  return { posts, count, likes };
};

export const createPost = async (post: IPost): Promise<Post> =>
  await Post.create(post);

export const updatePost = async (post: IPost): Promise<Post | Post[]> =>
  await Post.where("id", post.id).update(post);

export const del = async (id: number): Promise<Post | Post[]> =>
  await Post.where("id", id).delete();
