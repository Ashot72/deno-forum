import { useAppContext } from "../Contexts/AppContext";

const useTopicsState = () => {
  const { state } = useAppContext();
  return state.topics;
};

export default useTopicsState;
