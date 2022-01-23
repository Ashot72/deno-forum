import React from "react";

export type IPost = {
  id?: number;
  forumId: number;
  topicId: number;
  userId: number;
  title: string;
  email: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostsAction =
  | { type: "REMOVE_POSTS" }
  | { type: "LOAD_POSTS"; payload: IPost[] }
  | { type: "UPDATE_POST"; payload: IPost }
  | { type: "DELETE_POST"; payload: IPost };

const postsReducer: React.Reducer<IPost[], PostsAction> = (
  state: IPost[],
  action: PostsAction,
) => {
  switch (action.type) {
    case "REMOVE_POSTS":
      return [];
    case "LOAD_POSTS":
      return [...state, ...action.payload];
    case "UPDATE_POST":
      return [...state.map((post) => post.id === action.payload.id ? { ...post, ...action.payload } : post)];
    case "DELETE_POST":
      return [...state.filter((post) => post.id !== action.payload.id)];
    default: {
      return state;
    }
  }
};

export default postsReducer;
