import { useAppContext } from "../Contexts/AppContext";

const useForumsState = () => {
  const { state } = useAppContext();
  return state.forums;
};

export default useForumsState;
