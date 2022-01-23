import { User } from "../models/index.ts";
import type { IUser } from "../types/types.ts";

export const getUserByEmail = async (email: string): Promise<User> =>
  await User.where("email", email).first();

export const createUser = async (user: IUser): Promise<User> =>
  await User.create(user);
