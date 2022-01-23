import * as React from "react";
import { useEffect, useState } from "react";
import { Link, Spinner, SpinnerSize } from "office-ui-fabric-react";

import "../../App.scss";
import strings from "../../en-us";
import SidePanel from "../shared/SidePanel";
import { IForum } from "../../Reducers/reducers";
import ForumsForm from "./ForumsForm";
import Forums from "./Forums";
import { Actions } from "../../helpers/enums";
import ErrorMessageBar from "../shared/ErrorMessageBar";
import {
  useDispatch,
  useFormData,
  useFormState,
  useJWT,
  useService,
} from "../../Hooks";

const ForumsView: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const jwt = useJWT();

  const dispatch = useDispatch();

  const data = { title: "", description: "" };
  const formData = useFormData(isOpen, data);
  const formState = useFormState(formData);

  const { data: forums, loading, error: err, getForums, addForum } =
    useService();
  const [error, setError] = useState() as any;

  useEffect(getForums, [getForums]);
  useEffect(() => dispatch({ type: "LOAD_FORUMS", payload: forums }), [
    forums,
    dispatch,
  ]);
  useEffect(() => err && setError(err), [err]);

  const handleAddForum = () => {
    const jwtInfo = jwt();

    if (!jwtInfo) {
      setError(strings.AuthError);
    } else {
      const { title, description } = formState.state;

      const forum: Partial<IForum> = {
        title,
        description,
        userId: jwtInfo.id,
      };

      addForum(forum);
      setIsOpen(false);
    }
  };

  const openNewForm = () => {
    const decoded = jwt();
    decoded ? setIsOpen(true) : setError(strings.AuthError);
  };

  return (
    <div className="page">
      {<ErrorMessageBar error={error} setError={setError} />}
      {loading && <Spinner size={SpinnerSize.large} label={strings.Wait} />}
      <div className="link">
        <Link onClick={openNewForm}>{strings.NewForum}</Link>
      </div>
      <SidePanel isOpen={isOpen} setIsOpen={setIsOpen}>
        <ForumsForm
          action={Actions.Add}
          formState={formState}
          handleSubmit={handleAddForum}
          handleClose={() => setIsOpen(false)}
        />
      </SidePanel>
      <Forums />
    </div>
  );
};

export default ForumsView;
