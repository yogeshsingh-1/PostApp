import { TextField, Button, Typography, Box } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Axios from "../utils/axiox.utils";
import { AuthContext } from "../auth/AuthContext";
const SignUp = () => {
  const [input, setInput] = useState({ name: "", email: "", password: "" });
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setInput((prev) => {
      const { name, value } = e.target;
      return { ...prev, [name]: value };
    });
  };
  const handler = async (e) => {
    e.preventDefault();
    const { data } = await Axios.post("/auth/signup", input);
    if (data.status) {
      setInput({ name: "", email: "", password: "" });
      alert(data.message);
      navigate("/");
      setAuthState("valid");
    } else {
      alert(data.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 ">
          <Typography
            component={"h3"}
            className="text-center mb-4! text-2xl! font-bold! mt-3!"
          >
            SignUp
          </Typography>
          <form onSubmit={handler}>
            <Box className=" mb-3">
              <TextField
                fullWidth
                onChange={changeHandler}
                label="Name"
                placeholder="Name"
                name="name"
                value={input.name}
                required
              />
            </Box>
            <Box className=" mb-3">
              <TextField
                onChange={changeHandler}
                label="Email"
                placeholder="Email"
                name="email"
                value={input.email}
                fullWidth
                required
                type="email"
              />
            </Box>
            <Box className=" mb-3">
              <TextField
                onChange={changeHandler}
                label="Password"
                placeholder="Password"
                name="password"
                value={input.password}
                fullWidth
                required
                type="password"
              />
            </Box>
            <Box className=" mb-3">
              <Button fullWidth type="submit" variant={"contained"}>
                SignUp
              </Button>
            </Box>
          </form>
          <Typography
            component={"p"}
            className="text-center text-sm! text-gray-700"
          >
            Already have a account ?{" "}
            <NavLink to="/signin" className="text-blue-600 font-medium">
              LogIn
            </NavLink>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default SignUp;
