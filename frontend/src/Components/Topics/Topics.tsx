import * as React from "react";
import { useEffect, useState } from "react";

import strings from "../../en-us";
import { ITopic } from "../../Reducers/reducers";
import { Actions } from "../../helpers/enums";
import SidePanel from "../shared/SidePanel";
import TopicsForm from "./TopicsForm";
import Topic from "./Topic";
import ErrorMessageBar from "../shared/ErrorMessageBar";
import {
  useDispatch,
  useFormState,
  useService,
  useTopicsState,
} from "../../Hooks";

interface ITopics {
  forumId: number;
}

const Topics: React.FC<ITopics> = ({ forumId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const formState = useFormState(formData);
  const topics: ITopic[] = useTopicsState();

  const { error: err, updateTopic, deleteTopic } = useService();
  const [error, setError] = useState() as any;

  useEffect(() => err && setError(err), [err]);

  const dispatch = useDispatch();

  const editTopic = (topic: ITopic) => {
    const { id, title, userId, description } = topics.find((t) => t.id === topic.id)!;
    const updatedFormData = { id, userId, title, description };

    setFormData(updatedFormData);
    setIsOpen(true);
  };

  const handleSubmit = () => {
    const { id, userId, title, description, deleted } = formState.state;
    const topic: Partial<ITopic> = { id, userId, forumId, title, description };

    if (deleted) {
      deleteTopic(topic.id!);
      dispatch({ type: "DELETE_TOPIC", payload: topic });
    } else {
      updateTopic(topic);
      dispatch({
        type: "UPDATE_TOPIC",
        payload: { ...topic, updatedAt: Date.now() },
      });
    }

    setFormData(formState.state);
    setIsOpen(false);
  };

  return (
    <>
      {<ErrorMessageBar error={error} setError={setError} />}
      <div className={"ms-Grid-row header"}>
        <div className="ms-Grid-col ms-sm4">{strings.Title}</div>
        <div className="ms-Grid-col ms-sm3">{strings.RepliesViews}</div>
        <div className="ms-Grid-col ms-sm3">{strings.Updated}</div>
        <div className="ms-Grid-col ms-sm1">&nbsp;</div>
      </div>
      {topics.map((topic: ITopic, index: number) => (
        <div className={"ms-Grid-row row"} key={index}>
          <Topic
            topic={topic}
            editTopic={editTopic}
          />
        </div>
      ))}
      <SidePanel isOpen={isOpen} setIsOpen={setIsOpen}>
        <TopicsForm
          action={Actions.Update}
          formState={formState}
          handleSubmit={handleSubmit}
          handleClose={() => setIsOpen(false)}
        />
      </SidePanel>
    </>
  );
};

export default Topics;
