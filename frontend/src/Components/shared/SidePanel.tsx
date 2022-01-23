import * as React from "react";
import { DefaultButton, Panel, PanelType } from "office-ui-fabric-react";

import strings from "../../en-us";

interface ISidePanelProp {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SidePanel: React.FC<ISidePanelProp> = (
  { isOpen, setIsOpen, children },
) => {
  const onRenderFooterContent = () => (
    <DefaultButton onClick={() => setIsOpen(false)}>
      {strings.Close}
    </DefaultButton>
  );

  return (
    <Panel
      isOpen={isOpen}
      type={PanelType.medium}
      onDismiss={() => setIsOpen(false)}
      isFooterAtBottom={true}
      closeButtonAriaLabel={strings.Close}
      onRenderFooterContent={onRenderFooterContent}
    >
      {children}
    </Panel>
  );
};

export default SidePanel;
