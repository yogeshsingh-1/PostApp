import { useContext } from "react";
import Axios from "../utils/axiox.utils";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
const Home = () => {
  const { setAuthState } = useContext(AuthContext);

  const handleLogout = async () => {
    await Axios.get("/auth/logout");
    setAuthState("invalid");
  };
  return (
    <>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
    </>
  );
};

export default Home;
