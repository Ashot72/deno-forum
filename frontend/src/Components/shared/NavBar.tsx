import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "office-ui-fabric-react";

import strings from "../../en-us";
import { useJWT } from "../../Hooks";
import AuthForm from "./AuthForm";
import SidePanel from "./SidePanel";
import { TOKEN } from "../../helpers/constants";
import { Actions } from "../../helpers/enums";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOrRegister, setLoginRegister] = useState(Actions.Login);
  const [isLoggedin, setIsLogedIn] = useState(false);
  const jwt = useJWT();

  useEffect(() => {
    jwt() && setIsLogedIn(true);
  }, [isOpen, jwt]);

  const logout = () => {
    localStorage.removeItem(TOKEN);
    setIsLogedIn(false);
  };

  const setIsOpenAction = (action: Actions) => {
    setLoginRegister(action);
    setIsOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "20px",
        marginTop: "10px",
      }}
    >
      {isLoggedin
        ? (
          <span>
            {jwt()!.email} | <Link onClick={logout}>{strings.Logout}</Link>
          </span>
        )
        : (
          <>
            <Link onClick={() => setIsOpenAction(Actions.Login)}>
              {strings.Login}
            </Link>
            &nbsp;|&nbsp;
            <Link onClick={() => setIsOpenAction(Actions.Register)}>
              {strings.Register}
            </Link>
          </>
        )}
      <SidePanel isOpen={isOpen} setIsOpen={setIsOpen}>
        <AuthForm
          setIsOpen={setIsOpen}
          loginOrRegister={loginOrRegister}
        />
      </SidePanel>
    </div>
  );
};

export default NavBar;
