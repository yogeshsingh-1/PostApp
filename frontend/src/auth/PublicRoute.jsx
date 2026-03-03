import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const { authState } = useContext(AuthContext);

  if (authState === "loading") return <p>Loading...</p>;
  if (authState === "valid") return <Navigate to="/" replace />;
  return <Outlet />;
};

export default PublicRoute;
