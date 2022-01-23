import { compose, Router } from "../deps.ts";
import {
  createForum,
  deleteForum,
  getForum,
  getForums,
  updateForum,
} from "./forum.routes.ts";
import {
  createTopic,
  deleteTopic,
  getTopic,
  getTopicsByForumId,
  updateTopic,
  updateView,
} from "./topic.routes.ts";
import {
  createPost,
  deletePost,
  getPostsByTopicId,
  updatePost,
} from "./post.routes.ts";
import { login, register } from "./user.routes.ts";
import { createLike, getUserLikes } from "./like.routes.ts";

const router = new Router({ prefix: "/api" });

router
  .get("/forum/:id", getForum)
  .get("/forums", getForums)
  .post("/addForum", compose(createForum))
  .put("/updateForum", compose(updateForum))
  .delete("/deleteForum", compose(deleteForum));

router
  .get("/topic/:id", getTopic)
  .get("/topics/:fid", getTopicsByForumId)
  .post("/addTopic", compose(createTopic))
  .put("/updateTopic", compose(updateTopic))
  .put("/updateView", updateView)
  .delete("/deleteTopic", compose(deleteTopic));

router
  .get("/posts/:tid/:offset/:limit", getPostsByTopicId)
  .post("/addPost", compose(createPost))
  .put("/updatePost", compose(updatePost))
  .delete("/deletePost", compose(deletePost));

router
  .get("/likes/:uId", getUserLikes)
  .post("/addLike", compose(createLike));

router
  .post("/loginUser", compose(login))
  .post("/registerUser", compose(register));

export default router;
