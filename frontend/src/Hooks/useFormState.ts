import { useEffect, useState } from "react";

const useFormState = (data: any) => {
  const [state, setState] = useState(data);

  useEffect(() => setState(data), [data]);

  const handleChange = (e: any) =>
    setState({ ...state, [e.target.name]: e.target.value });
  const handleChecked = (e: any) =>
    setState({ ...state, [e.target.name]: e.target.checked });
  const handleCustom = (key: any, value: any) =>
    setState({ ...state, [key]: value });

  return { state, handleChecked, handleChange, handleCustom };
};

export default useFormState;
