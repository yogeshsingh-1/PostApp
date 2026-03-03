import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logout from "../pages/Logout";
const Navbar = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const handleLogout = () => {
    setAuthState("invalid");
    navigate("/signin");
  };
  return (
    <div className="bg-gray-300 w-full h-15 flex justify-between items-center px-10">
      {/* logo */}
      <Typography
        variant="h5"
        className="font-semibold! cursor-pointer"
        onClick={() => navigate("/")}
      >
        Blogger
      </Typography>
      {/* side bar */}
      <div className="flex items-center">
        <Box>
          <Button
            variant="text"
            className="text-xs! font-semibold! text-gray-950! mr-7! opacity-90 "
            onClick={() => navigate("/post")}
          >
            Post
          </Button>
        </Box>
        <Box>
          <Button
            variant="text"
            className="text-xs! font-semibold! text-gray-950! mr-7! opacity-90 "
            onClick={() => navigate("/post/new")}
          >
            Add Post
          </Button>
        </Box>
        {authState === "valid" ? (
          <Box>
            <Logout />
          </Box>
        ) : (
          <Box>
            <Button variant="outlined" onClick={() => navigate("/signin")}>
              SignIn
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Navbar;
