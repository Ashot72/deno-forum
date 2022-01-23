import { compare as cm, hash } from "../deps.ts";

const encrypt = async (password: string) => await hash(password);
const compare = async (password: string, hash: string) =>
  await cm(password, hash);

export { compare, encrypt };


