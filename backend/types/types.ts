export type IForum = {
  id: number;
  userId: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ITopic = {
  id: number;
  forumId: number;
  userId: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export type IPost = {
  id: number;
  forumId: number;
  topicId: number;
  userId: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export type IUser = {
  id?: number;
  email: string;
  password: string;
  role: string;
};

export type IType = {
  id: number;
  postId: number;
  userId: number;
};

export type RefreshToken = {
  refresh_token: string;
};
