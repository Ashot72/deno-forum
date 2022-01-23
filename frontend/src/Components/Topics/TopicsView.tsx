import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, Spinner, SpinnerSize } from "office-ui-fabric-react";

import "../../App.scss";
import strings from "../../en-us";
import Topics from "./Topics";
import { Actions } from "../../helpers/enums";
import SidePanel from "../shared/SidePanel";
import { ITopic } from "../../Reducers/reducers";
import TopicsForm from "./TopicsForm";
import Navigation from "../shared/Navigation";
import ErrorMessageBar from "../shared/ErrorMessageBar";
import {
  useDispatch,
  useFormData,
  useFormState,
  useJWT,
  useService,
} from "../../Hooks";

const TopicsView: React.FC = () => {
  const params = useParams();
  const jwt = useJWT();

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const data = { title: "", description: "" };
  const formData = useFormData(isOpen, data);
  const formState = useFormState(formData);

  const { data: forum, getForum } = useService();
  const { data: topics, loading, error: err, getTopics, addTopic } =
    useService();
  const [error, setError] = useState() as any;

  const forumId = +params.fid!;
  const forumTitle = forum.length > 0 ? forum[0].title : "";

  useEffect(() => getForum(forumId), [forumId, getForum]);
  useEffect(() => getTopics(forumId), [forumId, getTopics]);
  useEffect(() => dispatch({ type: "LOAD_TOPICS", payload: topics }), [topics, dispatch]);
  useEffect(() => err && setError(err), [err]);

  const handleAddTopic = () => {
    const jwtInfo = jwt();

    if (!jwtInfo) {
      setError(strings.AuthError);
    } else {
      const { title, description } = formState.state;

      const topic: Partial<ITopic> = {
        title,
        description,
        view: 0,
        forumId: forumId,
        userId: jwtInfo.id,
      };

      addTopic(topic);
      setIsOpen(false);
    }
  };

  const openNewTopic = () => {
    const decoded = jwt();
    decoded ? setIsOpen(true) : setError(strings.AuthError);
  };

  return (
    <div className="page">
      {<ErrorMessageBar error={error} setError={setError} />}
      <Navigation forumTitle={forumTitle} />
      {loading && <Spinner size={SpinnerSize.large} label={strings.Wait} />}
      <div className="link">
        <Link onClick={openNewTopic}>{strings.NewTopic}</Link>
      </div>
      <SidePanel isOpen={isOpen} setIsOpen={setIsOpen}>
        <TopicsForm
          action={Actions.Add}
          formState={formState}
          handleSubmit={handleAddTopic}
          handleClose={() => setIsOpen(false)}
        />
      </SidePanel>
      <Topics
        forumId={forumId}
      />
    </div>
  );
};

export default TopicsView;
