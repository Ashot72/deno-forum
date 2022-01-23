import React from "react";

export type IAppState = {
  forums: IForum[];
  topics: ITopic[];
};

export const initialState: IAppState = { forums: [], topics: [] };

export type IForum = {
  id?: number;
  userId: number;
  topics: number;
  posts: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ForumsAction =
  | { type: "LOAD_FORUMS"; payload: IForum[] }
  | { type: "UPDATE_FORUM"; payload: IForum }
  | { type: "DELETE_FORUM"; payload: IForum };

const forumsReducer: React.Reducer<IForum[], ForumsAction> = (
  state: IForum[],
  action: ForumsAction,
) => {
  switch (action.type) {
    case "LOAD_FORUMS":
      return action.payload;
    case "UPDATE_FORUM":
      return [...state.map((forum) => forum.id === action.payload.id ? { ...forum, ...action.payload } : forum)];
    case "DELETE_FORUM":
      return [...state.filter((forum) => forum.id !== action.payload.id)];
    default:
      return state;
  }
};

export type ITopic = {
  id?: number;
  forumId: number;
  userId: number;
  replies: number;
  view: number;
  title: string;
  email: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TopicsAction =
  | { type: "LOAD_TOPICS"; payload: ITopic[] }
  | { type: "UPDATE_TOPIC"; payload: ITopic }
  | { type: "DELETE_TOPIC"; payload: ITopic };

const topicsReducer: React.Reducer<ITopic[], TopicsAction> = (
  state: ITopic[],
  action: TopicsAction,
) => {
  switch (action.type) {
    case "LOAD_TOPICS":
      return action.payload;
    case "UPDATE_TOPIC":
      return [...state.map((topic) => topic.id === action.payload.id ? { ...topic, ...action.payload } : topic)];
    case "DELETE_TOPIC":
      return [...state.filter((forum) => forum.id !== action.payload.id)];
    default:
      return state;
  }
};

const appReducer: React.Reducer<IAppState, any> = (
  state: IAppState,
  action,
) => ({
  forums: forumsReducer(state.forums, action),
  topics: topicsReducer(state.topics, action),
});

export default appReducer;
