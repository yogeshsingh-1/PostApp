import { useEffect, useState } from "react";
import Axios from "../utils/axiox.utils";
import Post from "./Post";
const UserPost = () => {
  const id = parseInt(localStorage.getItem("id"));
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(`/post/user/${id}`);

      if (!data.status) {
        alert(data.message);
      }
      setPostData(data.data);
      setLoading(false);
    })();
  }, []);
  if (loading)
    return (
      <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  return postData.length > 0 ? (
    <div className="max-w-[85vw] mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10 ">
      {postData.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  ) : (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-2xl font-semibold text-zinc-700">
        No Posts Available
      </h2>
      <p className="text-zinc-500 mt-2">
        There are currently no posts to display.
      </p>
    </div>
  );
};

export default UserPost;
