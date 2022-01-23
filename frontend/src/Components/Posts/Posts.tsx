import * as React from "react";
import { useEffect, useState } from "react";

import strings from "../../en-us";
import { Actions } from "../../helpers/enums";
import { ILike } from "../../helpers/interfaces";
import { IPost } from "../../Reducers/postReducer";
import SidePanel from "../shared/SidePanel";
import PostsForm from "./PostsForm";
import Post from "./Post";
import ErrorMessageBar from "../shared/ErrorMessageBar";
import { useFormState, useService } from "../../Hooks";

interface IPosts {
  forumId: number;
  topicId: number;
  topicTitle: string;
  dispatch: any;
  state: any;
  likes: ILike[];
}

const Posts: React.FC<IPosts> = (
  { forumId, topicId, topicTitle, state, likes, dispatch },
) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({});
  const formState = useFormState(formData);
  const posts: IPost[] = state;

  const { error: err, updatePost, deletePost } = useService();
  const [error, setError] = useState() as any;

  useEffect(() => err && setError(err), [err]);

  const editPost = (post: IPost) => {
    const { id, title, description, userId } = posts.find((p) => p.id === post.id)!;
    const updatedFormData = {
      id,
      userId,
      title,
      topicId,
      forumId,
      description,
    };

    setFormData(updatedFormData);
    setIsOpen(true);
  };

  const handleSubmit = () => {
    const { id, title, description, deleted, userId } = formState.state;
    const post: Partial<IPost> = {
      id,
      userId,
      title,
      topicId,
      forumId,
      description,
    };

    if (deleted) {
      deletePost(post.id!);
      dispatch({ type: "DELETE_POST", payload: post });
    } else {
      updatePost(post);
      dispatch({
        type: "UPDATE_POST",
        payload: { ...post, updatedAt: Date.now() },
      });
    }

    setFormData(formState.state);
    setIsOpen(false);
  };

  const postLikes = (id: number): number =>
    likes.filter((l: ILike) => l.postId === id).length;

  return (
    <>
      {<ErrorMessageBar error={error} setError={setError} />}
      {
        <div className={"ms-Grid-row header"}>
          <div className="ms-Grid-col ms-sm6">{topicTitle}</div>
          <div className="ms-Grid-col ms-sm5">{strings.Updated}</div>
          <div className="ms-Grid-col ms-sm1">&nbsp;</div>
        </div>
      }
      {posts.map((post: IPost, index: number) => (
        <>
          <div className={"ms-Grid-row row"} key={index}>        
            <Post
              index={index}
              post={post}
              editPost={editPost}
              likes={postLikes(post.id!)}
            />
          </div>
        </>
      ))}
      <SidePanel isOpen={isOpen} setIsOpen={setIsOpen}>
        <PostsForm
          action={Actions.Update}
          formState={formState}
          handleSubmit={handleSubmit}
          handleClose={() => setIsOpen(false)}
        />
      </SidePanel>
    </>
  );
};

export default Posts;
