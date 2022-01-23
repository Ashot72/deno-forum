import * as React from "react";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
} from "office-ui-fabric-react";

import strings from "../../en-us";

interface IConfirmDeleteProp {
  title: string;
  onDelete: (shouldDelete: boolean) => void;
}

const ConfirmDelete: React.FC<IConfirmDeleteProp> = ({ title, onDelete }) => (
  <Dialog
    hidden={false}
    onDismiss={(e) => onDelete(false)}
    dialogContentProps={{
      type: DialogType.normal,
      title: "Confirm",
      subText: `${title}`,
    }}
    modalProps={{
      isBlocking: true,
      containerClassName: "ms-dialogMainOverride",
    }}
  >
    <DialogFooter>
      <PrimaryButton onClick={(e) => onDelete(true)} text={strings.Delete} />
      <DefaultButton onClick={(e) => onDelete(false)} text={strings.Cancel} />
    </DialogFooter>
  </Dialog>
);

export default ConfirmDelete;
