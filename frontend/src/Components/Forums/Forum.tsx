import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "office-ui-fabric-react/lib/Icon";

import "../../App.scss";
import strings from "../../en-us";
import ErrorMessageBar from "../shared/ErrorMessageBar";
import { IForum } from "../../Reducers/reducers";
import { useJWT } from "../../Hooks";

interface IForumsItem {
  forum: IForum;
  editForum: (forum: IForum) => void;
}

const Forum: React.FC<IForumsItem> = ({ forum, editForum }) => {
  const [error, setError] = useState("");
  const jwt = useJWT();

  const edit = () => {
    const jwtInfo = jwt();
    jwtInfo
      ? jwtInfo.role === "Admin" ? editForum(forum) : setError(strings.ErrorPermission)
      : setError(strings.AuthError)
  };

  return (
    <>
      {<ErrorMessageBar error={error} setError={setError} />}
      <div className="ms-Grid-col ms-sm7">
        <Link to={`/topics/${forum.id}`}>{forum.title}</Link>
        <div>{forum.description}</div>
      </div>
      <div className="ms-Grid-col ms-sm4">
        <div>
          {strings.Topics}: <b>{forum.topics}</b>
        </div>
        <div>
          {strings.Posts}: <b>{forum.posts}</b>
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

export default Forum;
