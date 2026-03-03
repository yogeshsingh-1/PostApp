import { useState } from "react";
import { Favorite, FavoriteBorder, Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Post = ({ post }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <div className="h-52 overflow-hidden">
        <img
          src={post.imageUrl}
          alt="post"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 text-sm mb-4">
          {post.description.length > 58
            ? post.description.slice(0, 70) + "..."
            : post.description}
        </p>

        <p className="text-xs text-gray-400 mb-3">By {post.userId}</p>

        <div className="flex justify-between items-center">
          <IconButton onClick={() => setLiked(!liked)}>
            {liked ? <Favorite className="text-red-500" /> : <FavoriteBorder />}
            {post.likeCount > 0 ? (
              <p className="text-sm">{post.likeCount}</p>
            ) : null}
          </IconButton>

          <div className="flex gap-2">
            <IconButton>
              <Edit
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate(`/post/update/${post.postId}`)}
              />
            </IconButton>
            <IconButton>
              <Delete className="text-red-500" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
