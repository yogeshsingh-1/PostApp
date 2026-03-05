import { createContext, useEffect, useState } from "react";
import Axios from "../utils/axiox.utils";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState("loading");

  const verifyUser = async () => {
    try {
      const { data } = await Axios.get("verify/verify-token");
      if (data.status) {
        localStorage.setItem("id", data.userId);
      }
console.log(data)
      setAuthState(data.status ? "valid" : "invalid");
    } catch (e) {
      setAuthState("invalid");
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, verifyUser, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
