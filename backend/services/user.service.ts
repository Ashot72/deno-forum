import { httpErrors } from "../deps.ts";
import { User } from "../models/index.ts";
import { compare, encrypt } from "../helpers/encryption.ts";
import type { IUser } from "../types/types.ts";
import { UserRole } from "../enums/enums.ts";
import * as userRepo from "../repositories/user.repository.ts";
import * as jwt from "../helpers/jwt.ts";

export const loginUser = async (
  { email, password }: IUser,
): Promise<{ access_token: string; refresh_token: string }> => {
  const user: User = await userRepo.getUserByEmail(email);

  if (user) {
    const passHash = <string>user.password;
    const isValidPass = await compare(password, passHash);
    if (isValidPass) {
      return {
        access_token: await jwt.getAuthToken(user),
        refresh_token: await jwt.getRefreshToken(user),
      };
    }
  }

  throw new httpErrors.Unauthorized("Wrong credential");
};

export const registerUser = async (loginUser: IUser): Promise<User> => {
 // try {
    const { password, role } = loginUser;
    loginUser.password = await encrypt(password);
    loginUser.role = role || UserRole.USER;

    const user = await userRepo.getUserByEmail(loginUser.email) 
    if(user) {
      throw new httpErrors.BadRequest(
        `Another user already exists with '${loginUser.email}' email.`,
      );
    } else {
      return await userRepo.createUser(loginUser);
    }
  //} catch (err) {
 //     console.log("User Error:", err.message)
  // }
};
