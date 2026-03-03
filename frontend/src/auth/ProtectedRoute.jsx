import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const ProtectedRoute = () => {
  const { authState } = useContext(AuthContext);
  if (authState === "loading") return <p>Loading...</p>;
  if (authState === "invalid") return <Navigate to="/signin" replace />;
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
