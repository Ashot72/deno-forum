import { create, verify } from "../deps.ts";
import type { Header, Payload } from "../deps.ts";
import { RefreshToken } from "../types/types.ts";
import { User } from "../models/index.ts";
import { env } from "../helpers/env.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

const header: Header = {
  alg: "HS512",
  typ: "JWT",
};

const getAuthToken = async (user: User) => {
  const payload: Payload = {
    iss: "forums",
    id: user.id,
    email: user.email,
    role: user.role,
    exp: new Date().getTime() + parseInt(env("JWT_ACCESS_TOKEN_EXP")),
  };

  return await create(header, payload, key);
};

const getRefreshToken = async (user: User) => {
  const payload: Payload = {
    iss: "forums",
    id: user.id,
    exp: new Date().getTime() + parseInt(env("JWT_REFRESH_TOKEN_EXP")),
  };

  return await create(header, payload, key);
};

const getJwtPayload = async (token: RefreshToken): Promise<Payload | null> => {
  try {
    return await verify(token.refresh_token, key);
  } catch (err) {
    console.log("getJwtPayload error:", err);
  }
  return null;
};

export { getAuthToken, getJwtPayload, getRefreshToken };
