import * as React from "react";
import { Link } from "react-router-dom";

import strings from "../../en-us";

interface INavigationProp {
  forumTitle: string;
  forumId?: number;
  topicTitle?: string;
}

const Navigation: React.FC<INavigationProp> = (
  { forumTitle, forumId, topicTitle },
) => {
  const forumLink = () => (
    <>
      <Link
        state={true}
        to={{
          pathname: "/",
        }}
      >
        {strings.Forums}
      </Link>{" "}
      {"->"}
    </>
  );

  return (
    <div style={{ padding: "5px" }}>
      {(!forumId && !topicTitle) &&
        (
          <>
            {forumLink()} {forumTitle}
          </>
        )}
      {forumId && topicTitle &&
        (
          <>
            {forumLink()}
            <Link
              state={true}
              to={{
                pathname: `/topics/${forumId}`,
              }}
            >
              {forumTitle}
            </Link>{" "}
            {"->"}
            {topicTitle}
          </>
        )}
    </div>
  );
};

export default Navigation;
