import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useRef } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useEffect, useState } from "react";
import Axios from "../utils/axiox.utils";
import Comments from "./Comments";
import EditOffIcon from "@mui/icons-material/EditOff";
const SinglePost = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const commentRef = useRef(null);
  const [postData, setPostData] = useState();
  const [comment, setComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [like, setLike] = useState(false);
  const adminId = localStorage.getItem("id");
  const image = "https://images.unsplash.com/photo-1492724441997-5dc865305da7";

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(`/post/${id}`);
      if (!data.status) {
        alert(data.data.message);
      }
      setLoading(false);
      setPostData(data.data);
    })();
  }, [id]);

  useEffect(() => {
    if (location.hash === "#comment" && postData) {
      setTimeout(() => {
        commentRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      });
    }
  }, [location, postData]);

  const addComment = async () => {
    if (!commentText.trim()) return;
    const { data } = await Axios.post("/comment", {
      postId: postData.postId,
      comment: commentText,
    });
    if (data.status) {
      setCommentText("");
      setRefresh((prev) => prev + 1);
      setComment((prev) => !prev);
      alert(data.message);
    }
  };
  if (loading) {
    return (
      <h4 className="max-w-[80vw] mx-auto mt-10 bg-white p-5 rounded-lg text-center font-semibold text-gray-500 text-lg">
        Loading...
      </h4>
    );
  }
  return (
    <>
      <div className="relative max-w-[80vw] mx-auto mt-10 rounded-md overflow-hidden shadow-md p-6 bg-white">
        <div className="h-[70vh] w-full shadow-md overflow-hidden rounded-sm">
          <img
            className="h-full w-full object-cover"
            src={postData.imageUrl ?? image}
            alt="image not loaded"
          />
        </div>
        <div className="mt-4">
          {/* title */}
          <div className="text-xl font-bold text-gray-800 cursor-pointer">
            {postData.title}
          </div>
          {/* description */}
          <div className="text-sm font-medium mt-2 text-gray-500">
            {postData.description}
          </div>
          <div className="mt-2 ">
            <div className="flex items-center">
              <IconButton>
                <AccountCircleRoundedIcon></AccountCircleRoundedIcon>
              </IconButton>
              <span className="text-sm font-semibold text-gray-800 tracking-tight normal-case!">
                {postData.User?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <IconButton
                onClick={() => setLike(!like)}
                className=" hover:bg-gray-300!"
              >
                {like ? (
                  <Favorite className="text-red-500" />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
              <div className="flex gap-2">
                <IconButton>
                  {postData.userId === parseInt(adminId) ? (
                    <Edit
                      className="text-blue-500 cursor-pointer"
                      onClick={() => navigate(`/post/update/${id}`)}
                    />
                  ) : (
                    <EditOffIcon
                      className="text-zinc-300 cursor-not-allowed"
                      title="You are not allowed to edit this post"
                    />
                  )}
                </IconButton>

                <IconButton className="text-red-500! hover:bg-gray-300!">
                  <Delete />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        {/* comment */}

        <div
          className="mt-6 transition duration-300 ease-in-out "
          ref={commentRef}
        >
          {/* Section Header */}
          <div className="mt-2 h-12 flex items-center justify-between bg-blue-50 px-4 text-gray-700 font-semibold text-lg rounded-xl">
            <span>Comments</span>
            <IconButton onClick={() => setComment(!comment)}>
              <AddCommentIcon />
            </IconButton>
          </div>
          {comment && (
            <div className="mt-4 flex gap-4">
              <TextField
                fullWidth
                size="small"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                name="Comment"
              />
              <Button variant="contained" size="small" onClick={addComment}>
                Comment
              </Button>
            </div>
          )}

          {postData?.postId && (
            <Comments postId={postData.postId} refresh={refresh} />
          )}
          {/* Comments List */}
        </div>
      </div>
    </>
  );
};

export default SinglePost;
