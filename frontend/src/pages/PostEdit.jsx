import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../utils/axiox.utils"; // tumhara Axios instance
import { TextField, Button } from "@mui/material";

const PostEdit = () => {
  const { postId } = useParams(); // URL se id
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch post data on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await Axios.get(`/post/${postId}`);
        if (data.status && data.data) {
          setPost({
            title: data.data.title,
            description: data.data.description,
            image: data.data.imageUrl,
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch post", err);
      }
    };

    fetchPost();
  }, [postId]);

  // Handle input changes
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
      const { data } = await Axios.put(`/post/${postId}`, post);
      if (!data.status) {
        alert(data.message);
      }
      alert(data.message);
      navigate("/post"); // redirect home
   
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Title"
          name="title"
          value={post.title}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Description"
          name="description"
          value={post.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          required
        />
        <TextField
          label="Image URL"
          name="image"
          value={post.image}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Update Post
        </Button>
      </form>
    </div>
  );
};

export default PostEdit;
