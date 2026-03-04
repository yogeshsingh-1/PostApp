import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Logout from "../pages/Logout";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState } = useContext(AuthContext);

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700";

  return (
    <div className="w-full h-16 bg-white shadow-md px-8 flex justify-between items-center ">
      {/* Logo */}
      <Typography
        variant="h5"
        onClick={() => navigate("/")}
        className="cursor-pointer font-bold tracking-tight text-zinc-800 hover:text-blue-600 transition"
      >
        Blogger
      </Typography>

      {/* Navigation */}
      <div className="flex items-center gap-6">
        <Button
          variant="text"
          className={`normal-case ${isActive("/post")}`}
          onClick={() => navigate("/post")}
        >
          Posts
        </Button>

        <Button
          variant="text"
          className={`normal-case ${isActive("/post/new")}`}
          onClick={() => navigate("/post/new")}
        >
          Add Post
        </Button>

        {authState === "valid" ? (
          <Logout />
        ) : (
          <Button
            variant="contained"
            className="normal-case rounded-lg"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
