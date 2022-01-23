import { Forum } from "../models/index.ts";
import type { IForum } from "../types/types.ts";
import * as forumRepo from "../repositories/forum.repository.ts";

export const getSingleForum = async (id: number): Promise<Forum> => await forumRepo.getForum(id);

export const get = async (): Promise<Forum | Forum[]> => await forumRepo.getForums();

export const create = async (forum: IForum): Promise<Forum> => await forumRepo.createForum(forum);

export const update = async (forum: IForum): Promise<Forum | Forum[]> => await forumRepo.updateForum(forum);

export const del = async (id: any): Promise<void> => await forumRepo.del(id);
