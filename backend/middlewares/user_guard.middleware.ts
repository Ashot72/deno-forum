import { Context, httpErrors } from "../deps.ts";
import { UserRole } from "../enums/enums.ts";
import { userHasRole } from "../helpers/roles.ts";

const userGuard = (role?: UserRole) => {
  return async (ctx: Context, next: () => Promise<unknown>) => {
    const { user } = ctx.state;
    if (!user) {
      throw new httpErrors.Unauthorized("Unauthorized user");
    }

    if (role) {
      const isRoleMatched = userHasRole(user, role);

      if (!isRoleMatched) {
        throw new httpErrors.Forbidden("Forbidden user role");
      }
    }

    await next();
  };
};

export { userGuard };
