import * as React from "react";
import { useEffect, useState } from "react";
import {
  DefaultButton,
  IStackTokens,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  TextField,
} from "office-ui-fabric-react";

import "../../App.scss";
import strings from "../../en-us";
import { useService } from "../../Hooks";
import { TOKEN } from "../../helpers/constants";
import { Actions } from "../../helpers/enums";

interface IAuthProp {
  setIsOpen: (isOpen: boolean) => void;
  loginOrRegister: Actions;
}

const stackTokens: IStackTokens = { childrenGap: 15 };

const AuthForm: React.FC<IAuthProp> = ({ setIsOpen, loginOrRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, loading, error: err, login, register } = useService();
  const [error, setError] = useState() as any;

  useEffect(() => {
    if (loginOrRegister === Actions.Login) {
      if (data.length > 0) {
        localStorage.setItem(TOKEN, data[0]);
        setIsOpen(false);
      }
    } else {
      if (data.length > 0) {
        if (data[0] !== 1) {
          setError(strings.RegError);
        } else {
          setIsOpen(false);
        }
      }
    }
  }, [data, loginOrRegister, setIsOpen]);

  useEffect(() => {
    setError(err);
    if (err) {
      setIsOpen(true);
    }
  }, [err, setIsOpen]);

  const onLogin = () => {
    setError("");

    if (!email.trim()) {
      setError(strings.EmailRequired);
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError(strings.InvalidEmail);
      return;
    }

    if (!password.trim()) {
      setError(strings.PasswordRequired);
      return;
    }

    loginOrRegister === Actions.Login
      ? login(email, password)
      : register(email, password, Actions.User);
  };

  return (
    <>
      {error && (
        <div className="error">
          {error.message
            ? error.message.split(",").map((e: string, index: number) => (
              <div key={index}>{e}</div>
            ))
            : error}
        </div>
      )}
      {loading && <Spinner size={SpinnerSize.large} label={strings.Wait} />}
      <Stack tokens={stackTokens}>
        <TextField
          label={strings.Email}
          name="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          label={strings.Password}
          name="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          required
        />
      </Stack>
      <br />
      <Stack horizontal tokens={stackTokens}>
        <PrimaryButton
          text={loginOrRegister === Actions.Login
            ? strings.Login
            : strings.Register}
          onClick={onLogin}
        />
        <DefaultButton text={strings.Cancel} onClick={() => setIsOpen(false)} />
      </Stack>
    </>
  );
};

export default AuthForm;
