import * as React from "react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { Icon, MessageBar, MessageBarType } from "office-ui-fabric-react";

import strings from "../../en-us";
import { DATEFORMAT } from "../../helpers/constants";
import { IPost } from "../../Reducers/postReducer";
import { useJWT } from "../../Hooks";
import ErrorMessageBar from "../shared/ErrorMessageBar";
import { useService } from "../../Hooks";

interface IPostsItem {
  index: number;
  post: IPost;
  likes: number;
  editPost: (post: IPost) => void;
}

const Post: React.FC<IPostsItem> = ({ post, likes, editPost }) => {
  const [likeAlert, setLikeAlert] = useState(false);
  const { data: userLike, error: err, likePost } = useService();
  const [error, setError] = useState("");

  const jwt = useJWT();

  useEffect(() => {
    if (userLike.length > 0) {
      setLikeAlert(true);
    }
  }, [userLike]);
  useEffect(() => err && setError(err), [err]);

  const edit = () => {
    const jwtInfo = jwt();
    jwtInfo
      ? jwtInfo.role === "Admin" || jwtInfo.id === post.userId
        ? editPost(post)
        : setError(strings.ErrorPermission)
      : setError(strings.AuthError)
  };

  const like = () => {
    const jwtInfo = jwt();
    jwtInfo ? likePost({ userId: jwtInfo.id, postId: post.id! }) : setError(strings.AuthError)
  };

  return (
    <>
      {<ErrorMessageBar error={error} setError={setError} />}
      <hr />
      {likeAlert &&
        (
          <div className="messageBar">
            <MessageBar
              messageBarType={MessageBarType.info}
              onDismiss={() => setLikeAlert(false)}
            >
              {userLike[0].like ? strings.Liked : strings.UnLiked}
            </MessageBar>
          </div>
        )}
      <div className="ms-Grid-col ms-sm6">
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>{post.title}</div>
          <b>{likes}</b>
          <div>
            <Icon
              iconName="Like"
              className="icon"
              title={strings.Like}
              style={{ marginTop: 0, marginLeft: "4px" }}
              onClick={like}
            />
          </div>
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: post.description.split("\n").join("<br />"),
            }}
          />
        </div>
      </div>
      <div className="ms-Grid-col ms-sm5">
        <div>{strings.By} {post.email}</div>
        <div>
          <Moment locale={"en-us"} format={DATEFORMAT}>
            {post.updatedAt}
          </Moment>
        </div>
      </div>
      <div className="ms-Grid-col ms-sm1">
        <div style={{ display: "flex" }}>
          <Icon
            iconName="Edit"
            className="icon"
            title={strings.EditPost}
            onClick={edit}
          />
        </div>
      </div>
    </>
  );
};

export default Post;
