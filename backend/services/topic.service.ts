import { Topic } from "../models/index.ts";
import type { ITopic } from "../types/types.ts";
import * as topicRepo from "../repositories/topic.repository.ts";

export const get = async (id: number): Promise<Topic> =>
  await topicRepo.getTopic(id);

export const getByForumId = async (forumId: number): Promise<Topic | Topic[]> => await topicRepo.getTopicsByForumId(forumId);

export const create = async (topic: ITopic): Promise<Topic> => await topicRepo.createTopic(topic);

export const update = async (topic: ITopic): Promise<Topic | Topic[]> => await topicRepo.updateTopic(topic);

export const del = async (id: any): Promise<void> => await topicRepo.del(id);
