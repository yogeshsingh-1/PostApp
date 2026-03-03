import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import Axios from "../utils/axiox.utils";
import { useNavigate } from "react-router-dom";
const NewPost = () => {
  const navigate = useNavigate();
  const [postState, setPostState] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const inputHandler = (e) => {
    setPostState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await Axios.post("/post", postState);
    console.log(data);
    if (data.status) {
      alert(data.message);
      navigate("/post");
    }
  };
  return (
    <>
      <div className="mt-10 bg-white max-w-lg mx-auto p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add Post</h2>
        <form onSubmit={submitHandler}>
          <Box className="mb-4">
            <TextField
              onChange={inputHandler}
              name="title"
              label="Name"
              fullWidth
              required
              value={postState.title}
            />
          </Box>
          <Box className="mb-4">
            <TextField
              onChange={inputHandler}
              name="description"
              label="Description"
              rows={4}
              multiline
              fullWidth
              required
              value={postState.description}
            />
          </Box>
          <Box className="mb-4">
            <TextField
              onChange={inputHandler}
              name="imageUrl"
              label="ImageUrl"
              fullWidth
              required
              value={postState.imageUrl}
            />
          </Box>
          <Box className="mb-4">
            <Button type="submit" variant="contained" fullWidth>
              Add Post
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default NewPost;
