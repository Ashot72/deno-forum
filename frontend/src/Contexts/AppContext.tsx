import { createContext, Dispatch, useContext, useReducer } from "react";

import appReducer, { IAppState, initialState } from "../Reducers/reducers";

interface InitialStateProps {
  state: IAppState;
  dispatch: Dispatch<any>;
}

const Context = createContext<InitialStateProps>({
  state: { forums: [], topics: [] },
  dispatch: () => { },
});

export const AppStateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <Context.Provider value={{ state, dispatch }} children={children} />;
};

export const useAppContext = () => useContext(Context);
