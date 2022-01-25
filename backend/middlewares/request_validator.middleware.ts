import type { ValidationErrors, ValidationRules } from "../deps.ts";
import { compose, Context, httpErrors, validate } from "../deps.ts";

const getErrorMessage = (errors: ValidationErrors): string => {
  const errMessages = [];
  for (const attr in errors) {
    const attrErrors = errors[attr];
    for (const rule in attrErrors) {
      errMessages.push(attrErrors[rule]);
    }
  }
  return errMessages.join(",");
};

const requestValidator = ({ bodyRules }: { bodyRules: ValidationRules }) => {
  return async (ctx: Context, next: () => Promise<unknown>) => {
    const body = (await ctx.request.body()).value;

    const [isValid, errors] = await validate(await body, bodyRules);
    if (!isValid) {
      const message = getErrorMessage(errors);
      throw new httpErrors.BadRequest(message);
    }

    await next();
  };
};

export { requestValidator };
