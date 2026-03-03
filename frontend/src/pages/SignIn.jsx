import { TextField, Button, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "../utils/axiox.utils";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const SignIn = () => {
  const [input, setInput] = useState({ email: "", password: "" });
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
    console.log("Form submitted");
    const { data } = await Axios.post("/auth/signin", input);
    console.log(data);
    if (data.status) {
      setInput({ name: "", email: "", password: "" });
      alert(data.message);
      setAuthState("valid");
      // navigate("/");
    } else {
      alert(data.message);
    }
  };
  return (
    <>
      <div className="border w-[50%] h-[50vh] -translate-x-[50%] -translate-y-[50%] absolute top-[50%] left-[50%] mx-auto! bg-gray-200 ">
        <Typography
          component={"h3"}
          className="text-center mb-4! text-2xl! font-bold! mt-3!"
        >
          LogIn
        </Typography>
        <form onSubmit={handler}>
          <Box className="w-2/3 mx-auto mb-3">
            <TextField
              onChange={changeHandler}
              label="Email"
              placeholder="Email"
              name="email"
              value={input.email}
              fullWidth
              required
            />
          </Box>
          <Box className="w-2/3 mx-auto mb-3">
            <TextField
              onChange={changeHandler}
              label="Password"
              placeholder="Password"
              name="password"
              value={input.password}
              fullWidth
              required
            />
          </Box>
          <Box className="w-2/3 mx-auto mb-3">
            <Button fullWidth type="submit" variant={"contained"}>
              SignIn
            </Button>
          </Box>
        </form>
        <Typography
          component={"p"}
          className="text-center text-sm! text-gray-700"
        >
          Create a new account ?{" "}
          <NavLink to="/signup" className="text-blue-500">
            SignUp
          </NavLink>
        </Typography>
      </div>
    </>
  );
};

export default SignIn;
