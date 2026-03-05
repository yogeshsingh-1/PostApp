import React, { useState } from "react";
import { Favorite, FavoriteBorder, Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditOffIcon from "@mui/icons-material/EditOff";
const Post = ({ post }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const id = localStorage.getItem("id");
  const shortDesc =
    post.description.length > 60
      ? post.description.slice(0, 60) + "..."
      : post.description;
  const toggleLike = async () => {
    // setLiked((prev) => !prev);
    await Axios.post("/like", { postId: post.postId });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
      <div
        className="h-52 overflow-hidden"
        onDoubleClick={() => navigate(`/post/${post.postId}`)}
      >
        <img
          src={`${post.imageUrl}?w=500`}
          alt="post"
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition duration-500 ease-in-out "
        />
      </div>
      <div className="p-5">
        <h2
          className="text-lg font-bold mb-2 text-zinc-500 cursor-pointer whitespace-nowrap tracking-tighter"
          onClick={() => navigate(`/post/${post.postId}`)}
        >
          {post.title}
        </h2>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed tracking-tight">
          {shortDesc}
        </p>

        <p className="text-xs text-gray-400 mb-3">
          By{" "}
          <span className="ml-1 text-zinc-700 font-bold text-md capitalize">
            {post.User?.name}
          </span>
        </p>

        <div className="flex justify-between items-center">
          <IconButton onClick={toggleLike}>
            {post.Likes[0]?.userId === parseInt(id) ? (
              <Favorite className="text-red-500" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>

          <div className="flex gap-2">
            {/* chat */}
            <IconButton
              onClick={() => navigate(`/post/${post.postId}#comment`)}
            >
              {/* <Delete className="text-red-500" /> */}
              <ChatBubbleOutlineIcon />
            </IconButton>
            {/* Edit */}
            <IconButton>
              {post.userId === parseInt(id) ? (
                <Edit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate(`/post/update/${post.postId}`)}
                />
              ) : (
                <EditOffIcon
                  className="text-zinc-300 cursor-not-allowed"
                  title="You are not allowed to edit this post"
                />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Post);
