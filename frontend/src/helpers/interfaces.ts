import { Actions } from "./enums";

export interface IForumsFormProp {
  action: Actions;
  formState: any;
  handleSubmit: () => void;
  handleClose: () => void;
}

export interface ILike {
  id?: number;
  postId: number;
  userId: number;
}

export interface IJWT {
  id: number;
  email: string;
  exp: number;
  role: string;
}
