import { useAppContext } from "../Contexts/AppContext";

const useDispatch = () => {
  const { dispatch } = useAppContext();
  return dispatch;
};

export default useDispatch;
