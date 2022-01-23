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

import ConfirmDelete from "../shared/ConfirmDelete";
import { Actions } from "../../helpers/enums";
import { IForumsFormProp } from "../../helpers/interfaces";
import strings from "../../en-us";

const stackTokens: IStackTokens = { childrenGap: 15 };

const PostsForm: React.FC<IForumsFormProp> = (
  { action, formState = {}, handleSubmit, handleClose },
) => {
  const { state = {}, handleChange, handleChecked } = formState;
  const { title, description, deleted } = state;

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const onSave = () => {
    setError("");

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
        {action === Actions.Reply ? strings.Reply : strings.Update}
      </b>
      <Stack tokens={stackTokens}>      
        <TextField
          label={strings.Description}
          rows={8}
          multiline
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
        {
          action === Actions.Update &&          
            <Checkbox
              label={strings.Delete}
              name="deleted"
              value={deleted}
              onChange={handleChecked}
            />
          }
      </Stack>
      <br />
      <Stack horizontal tokens={stackTokens}>
        <PrimaryButton text={strings.Save} onClick={onSave} />
        <DefaultButton text={strings.Cancel} onClick={handleClose} />
      </Stack>
      {isOpen &&
        (
          <ConfirmDelete
            title={`${strings.ConfirmDelete} ${strings.Topic}`}
            onDelete={onDelete}
          />
        )}
    </>
  );
};

export default PostsForm;
