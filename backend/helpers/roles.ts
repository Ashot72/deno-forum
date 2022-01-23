import type { IUser } from "../types/types.ts";
import { UserRole } from "../enums/enums.ts";

export const userHasRole = (user: IUser, role: UserRole): boolean =>
  user.role === role ? true : user.role === UserRole.ADMIN ? true : false;
