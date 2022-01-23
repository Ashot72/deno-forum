import jwt_decode from "jwt-decode";

import { TOKEN } from "../helpers/constants";
import { IJWT } from "../helpers/interfaces";

const useJWT = () => {
  const getToken = () => {
    const jwt = localStorage.getItem(TOKEN);

    if (jwt) {
      const { exp, email, id, role }: IJWT = jwt_decode(jwt);
      var diffInMinutes = (exp - new Date().getTime()) / 60000;
      if (diffInMinutes > 1) {
        return { exp, email, id, role };
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  return getToken;
};

export default useJWT;
