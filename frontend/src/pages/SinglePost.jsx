import { useNavigate, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useEffect, useState } from "react";
import Axios from "../utils/axiox.utils";
import Comments from "./Comments";
const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [postData, setPostData] = useState();
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
  const [like, setLike] = useState(false);
  const image = "https://images.unsplash.com/photo-1492724441997-5dc865305da7";
  if (loading) {
    return (
      <h4 className="max-w-[80vw] mx-auto mt-10 bg-white p-5 rounded-lg text-center font-semibold text-gray-500 text-lg">
        Loading...
      </h4>
    );
  }
  return (
    <>
      <div className=" max-w-[80vw] mx-auto mt-10 rounded-md overflow-hidden shadow-md p-6 bg-white">
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
              <span className="text-sm font-semibold text-gray-800 tracking-tight !normal-case">
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
                <IconButton
                  className="text-blue-400! hover:bg-gray-300!"
                  onClick={() => navigate(`/post/update/${id}`)}
                >
                  <Edit />
                </IconButton>
                <IconButton className="text-red-500! hover:bg-gray-300!">
                  <Delete />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        {/* comment */}
        <div className="mt-6">
          {/* Section Header */}
          <div className="mt-2 h-12 flex items-center bg-blue-50 px-4 text-gray-700 font-semibold text-lg rounded-xl">
            Comments
          </div>

          {/* Comments List */}
          {postData?.postId && <Comments postId={postData.postId} />}
        </div>
      </div>
    </>
  );
};

export default SinglePost;
