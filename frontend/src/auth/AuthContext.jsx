import { createContext, useEffect, useState } from "react";
import Axios from "../utils/axiox.utils";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState("loading");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get("verify/verify-token");
        setAuthState(data.status ? "valid" : "invalid");
      } catch (e) {
        setAuthState("invalid");
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
