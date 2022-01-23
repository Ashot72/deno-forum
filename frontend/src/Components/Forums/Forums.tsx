import * as React from "react";
import { useEffect, useState } from "react";

import "../../App.scss";
import strings from "../../en-us";
import { IForum } from "../../Reducers/reducers";
import { Actions } from "../../helpers/enums";
import SidePanel from "../shared/SidePanel";
import ForumsForm from "./ForumsForm";
import Forum from "./Forum";
import ErrorMessageBar from "../shared/ErrorMessageBar";
import {
  useDispatch,
  useFormState,
  useForumsState,
  useService,
} from "../../Hooks";

const Forums: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const formState = useFormState(formData);
  const forums: IForum[] = useForumsState();

  const { error: err, updateForum, deleteForum } = useService();
  const [error, setError] = useState() as any;

  useEffect(() => err && setError(err), [err]);

  const dispatch = useDispatch();

  const editForum = (forum: IForum) => {
    const { id, title, description } = forums.find((f) => f.id === forum.id)!;
    const updatedFormData = { id, title, description };

    setFormData(updatedFormData);
    setIsOpen(true);
  };

  const handleSubmit = () => {
    const { id, title, description, deleted } = formState.state;
    const forum: Partial<IForum> = { id, title, description };

    if (deleted) {
      deleteForum(forum.id!);
      dispatch({ type: "DELETE_FORUM", payload: forum });
    } else {
      updateForum(forum);
      dispatch({ type: "UPDATE_FORUM", payload: forum });
    }

    setFormData(formState.state);
    setIsOpen(false);
  };

  return (
    <>
      {<ErrorMessageBar error={error} setError={setError} />}
      <div className={"ms-Grid-row header"}>
        <div className="ms-Grid-col ms-sm7">{strings.Name}</div>
        <div className="ms-Grid-col ms-sm4">{strings.TopicsPosts}</div>
        <div className="ms-Grid-col ms-sm1">&nbsp;</div>
      </div>
      {forums.map((forum: IForum, index: number) => (
        <div className={"ms-Grid-row row"} key={index}>
          <Forum
            forum={forum}
            editForum={editForum}
          />
        </div>
      ))}
      <SidePanel isOpen={isOpen} setIsOpen={setIsOpen}>
        <ForumsForm
          action={Actions.Update}
          formState={formState}
          handleSubmit={handleSubmit}
          handleClose={() => setIsOpen(false)}
        />
      </SidePanel>
    </>
  );
};

export default Forums;
