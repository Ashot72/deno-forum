import * as React from "react";
import { useState } from "react";
import {
  Checkbox,
  DefaultButton,
  IStackTokens,
  PrimaryButton,
  Stack,
  TextField,
} from "office-ui-fabric-react";

import "../../App.scss";
import strings from "../../en-us";
import ConfirmDelete from "../shared/ConfirmDelete";
import { Actions } from "../../helpers/enums";
import { IForumsFormProp } from "../../helpers/interfaces";

const stackTokens: IStackTokens = { childrenGap: 15 };

const ForumsForm: React.FC<IForumsFormProp> = (
  { action, formState = {}, handleSubmit, handleClose },
) => {
  const { state = {}, handleChange, handleChecked } = formState;
  const { title, description, deleted } = state;

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const onSave = () => {
    setError("");

    if (!title.trim()) {
      setError(strings.TitleRequired);
      return;
    }

    if (!description.trim()) {
      setError(strings.DescriptionRequired);
      return;
    }

    deleted ? setIsOpen(true) : handleSubmit();
  };

  const onDelete = (shouldDelete: boolean) => {
    setIsOpen(false);

    if (shouldDelete) {
      handleSubmit();
    }
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <b className="header">
        {action === Actions.Add ? strings.Add : strings.Update}
      </b>
      <Stack tokens={stackTokens}>
        <TextField
          label={strings.Title}
          name="title"
          value={title}
          onChange={handleChange}
          required
        />
        <TextField
          label={strings.Description}
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
        {action === Actions.Update &&
          (
            <Checkbox
              label={strings.Delete}
              name="deleted"
              value={deleted}
              onChange={handleChecked}
            />
          )}
      </Stack>
      <br />
      <Stack horizontal tokens={stackTokens}>
        <PrimaryButton text={strings.Save} onClick={onSave} />
        <DefaultButton text={strings.Cancel} onClick={handleClose} />
      </Stack>
      {isOpen &&
        (
          <ConfirmDelete
            title={`${strings.ConfirmDelete} ${strings.Forum}`}
            onDelete={onDelete}
          />
        )}
    </>
  );
};

export default ForumsForm;
