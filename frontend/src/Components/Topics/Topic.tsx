import * as React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import { Icon } from "office-ui-fabric-react/lib/Icon";

import { DATEFORMAT } from "../../helpers/constants";
import { ITopic } from "../../Reducers/reducers";
import strings from "../../en-us";
import ErrorMessageBar from "../shared/ErrorMessageBar";
import { useJWT } from "../../Hooks";

interface ITopicsItem {
  topic: ITopic;
  editTopic: (topic: ITopic) => void;
}

const Topic: React.FC<ITopicsItem> = ({ topic, editTopic }) => {
  const params = useParams();
  const [error, setError] = useState("");
  const jwt = useJWT();

  const edit = () => {
    const jwtInfo = jwt();
    jwtInfo
      ? jwtInfo.role === "Admin" || jwtInfo.id === topic.userId
        ? editTopic(topic)
        : setError(strings.ErrorPermission)
      : setError(strings.AuthError)
  };

  return (
    <>
      {<ErrorMessageBar error={error} setError={setError} />}
      <div className="ms-Grid-col ms-sm4">
        <Link to={`/posts/${params.fid}/${topic.id}`}>{topic.title}</Link>
        <div>{topic.description}</div>
      </div>
      <div className="ms-Grid-col ms-sm3">
        <div>
          {strings.Replies}: <b>{topic.replies}</b>
        </div>
        <div>
          {strings.Views}: <b>{topic.view}</b>
        </div>
      </div>
      <div className="ms-Grid-col ms-sm4">
        <div>{strings.By} {topic.email}</div>
        <div>
          <Moment locale={"en-us"} format={DATEFORMAT}>
            {topic.updatedAt}
          </Moment>
        </div>
      </div>
      <div className="ms-Grid-col ms-sm1">
        <Icon
          iconName="Edit"
          className="icon"
          title={strings.EditForum}
          onClick={edit}
        />
      </div>
    </>
  );
};

export default Topic;
