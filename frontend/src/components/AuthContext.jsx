import { createContext, useState, useEffect } from "react";
import Axios from "../utils/axiox.utils";

export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState("loading");

//   useEffect(() => {
//     const verify = async () => {
//       try {
//         const { data } = await Axios.get("verify/verify-token");
//         console.log(data);
//         setAuthState(data.status ? "valid" : "invalid");
//       } catch {
//         setAuthState("invalid");
//       }
//     };

//     verify();
//   }, []);

//   useEffect(() => {
//     const handleUnauthorized = () => {
//       setAuthState("invalid");
//     };

//     window.addEventListener("unauthorized", handleUnauthorized);

//     return () => {
//       window.removeEventListener("unauthorized", handleUnauthorized);
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ authState, setAuthState }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
