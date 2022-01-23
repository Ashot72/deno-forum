import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react";

import "../../App.scss";

interface IErrorMessageBar {
  error: any;
  setError: (error: string) => void;
}

const ErrorMessageBar: React.FC<IErrorMessageBar> = ({ error, setError }) =>
  error
    ? (
      <div className="messageBar">
        <MessageBar
          messageBarType={MessageBarType.error}
          onDismiss={() => setError("")}
        >
          {error.message || error}
        </MessageBar>
      </div>
    )
    : null;

export default ErrorMessageBar;
