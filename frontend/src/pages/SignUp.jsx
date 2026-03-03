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
    console.log(data);
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
      <div className="border w-[50%] h-[60vh] -translate-x-[50%] -translate-y-[50%] absolute top-[50%] left-[50%] mx-auto! bg-gray-200 ">
        <Typography
          component={"h3"}
          className="text-center mb-4! text-2xl! font-bold! mt-3!"
        >
          SignUp
        </Typography>
        <form onSubmit={handler}>
          <Box className="w-2/3 mx-auto mb-3">
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
              SignUp
            </Button>
          </Box>
        </form>
        <Typography
          component={"p"}
          className="text-center text-sm! text-gray-700"
        >
          Already have a account ?{" "}
          <NavLink to="/signin" className="text-blue-500">
            LogIn
          </NavLink>
        </Typography>
      </div>
    </>
  );
};

export default SignUp;
