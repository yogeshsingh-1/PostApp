import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import Axios from "../utils/axiox.utils";
import { Button } from "@mui/material";
const Logout = () => {
  const { setAuthState } = useContext(AuthContext);

  const handleLogout = async () => {
    console.log("hello");
    const { data } = await Axios.get("/auth/logout");
    setAuthState("invalid");
  };
  return (
    <Button variant="contained" className="text-xs!" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
