import * as React from "react";
import { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Link,
  PrimaryButton,
  Spinner,
  SpinnerSize,
} from "office-ui-fabric-react";

import "../../App.scss";
import strings from "../../en-us";
import Posts from "./Posts";
import { Actions } from "../../helpers/enums";
import Navigation from "../shared/Navigation";
import SidePanel from "../shared/SidePanel";
import postsReducer, { IPost } from "../../Reducers/postReducer";
import { LIMIT } from "../../helpers/constants";
import ErrorMessageBar from "../shared/ErrorMessageBar";
import PostsForm from "./PostsForm";
import { useFormData, useFormState, useJWT, useService } from "../../Hooks";

const PostsView: React.FC = () => {
  const { fid, tid } = useParams();
  const jwt = useJWT();

  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(postsReducer, []);

  const data = { title: "", description: "" };
  const formData = useFormData(isOpen, data);
  const formState = useFormState(formData);

  const { data: forum, getForum } = useService();
  const { data: topic, getTopic } = useService();
  const { data: all, loading, error: err, getPosts, addPost, updateView } = useService(dispatch);
  const [error, setError] = useState() as any;

  const { posts, count, likes } = all;

  const forumId = +fid!;
  const forumTitle = forum.length > 0 && forum[0].title ? forum[0].title : "";

  const topicId = +tid!;
  const topicTitle = topic.length > 0 ? topic[0].title : "";

  const skip = useRef(0);

  useEffect(() => getForum(forumId), [forumId, getForum]);
  useEffect(() => getTopic(topicId), [topicId, getTopic]);

  useEffect(() => getPosts(topicId, skip.current, LIMIT), [topicId, getPosts]);
  useEffect(() => posts && dispatch({ type: "LOAD_POSTS", payload: posts }), [posts, dispatch]);
  useEffect(() => {
    if (topic.length > 0) {
      updateView({ id: topicId, view: topic[0].view + 1 });
    }
  }, [topicId, topic, updateView]);
  useEffect(() => err && setError(err), [err]);

  const onLoadMore = () => {
    skip.current += LIMIT;
    console.log("limit", skip.current)
    getPosts(topicId, skip.current, LIMIT);
  };

  const loadedPosts = () =>
    posts.length < 2 ? posts.length : skip.current + LIMIT;

  const handlePostReply = () => {
    const jwtInfo = jwt();

    if (!jwtInfo) {
      setError(strings.AuthError);
    } else {
      const { description } = formState.state;

      const post: Partial<IPost> = {
        title: topicTitle,
        description,
        forumId: forumId,
        topicId: topicId,
        userId: jwtInfo!.id,
      };

      addPost(post);
      skip.current = 0
      setIsOpen(false);
    }
  };

  const openNewReply = () => {
    const decoded = jwt();
    decoded ? setIsOpen(true) : setError(strings.AuthError);
  };

  return (
    <div className="page">
      {<ErrorMessageBar error={error} setError={setError} />}
      <Navigation
        forumTitle={forumTitle}
        forumId={forumId}
        topicTitle={topicTitle}
      />
      {loading && <Spinner size={SpinnerSize.large} label={strings.Wait} />}
      <div className="link">
        <Link onClick={openNewReply}>{strings.ReplyPost}</Link>
      </div>
      <SidePanel isOpen={isOpen} setIsOpen={setIsOpen}>
        <PostsForm
          action={Actions.Reply}
          formState={formState}
          handleSubmit={handlePostReply}
          handleClose={() => setIsOpen(false)}
        />
      </SidePanel>
      <Posts
        forumId={forumId}
        topicId={topicId}
        topicTitle={topicTitle}
        dispatch={dispatch}
        state={state}
        likes={likes}
      />
      <div>
        {!loading && count && (count - skip.current > LIMIT)
          ? (
            <div className="loadMore">
              <PrimaryButton
                text={`${strings.LoadMore} (${loadedPosts()} ${strings.of} ${count})`}
                onClick={onLoadMore}
              />
            </div>
          )
          : null}
      </div>
    </div>
  );
};

export default PostsView;
