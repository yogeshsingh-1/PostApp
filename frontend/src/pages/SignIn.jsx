import { TextField, Button, Typography, Box } from "@mui/material";
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "../utils/axiox.utils";
import { AuthContext } from "../auth/AuthContext";

const SignIn = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await Axios.post("/auth/signin", input);

      if (data.status) {
        setInput({ email: "", password: "" });
        setAuthState("valid");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <Typography
          component="h2"
          className="text-center text-2xl! font-bold! mb-4! tracking-tight"
        >
          Sign In
        </Typography>

        <form onSubmit={handler}>
          <Box className="mb-4">
            <TextField
              label="Email"
              name="email"
              value={input.email}
              onChange={changeHandler}
              fullWidth
              required
              type="email"
            />
          </Box>

          <Box className="mb-4">
            <TextField
              label="Password"
              type="password"
              name="password"
              value={input.password}
              onChange={changeHandler}
              fullWidth
              required
            />
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            className="normal-case py-2 rounded-lg"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <Typography className="text-center text-sm! text-gray-600 mt-4!">
          Create a new account?{" "}
          <NavLink to="/signup" className="text-blue-600 font-medium">
            Sign Up
          </NavLink>
        </Typography>
      </div>
    </div>
  );
};

export default SignIn;
