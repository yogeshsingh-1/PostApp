import { useEffect, useState } from "react";
import Axios from "../utils/axiox.utils";
import Post from "./Post";
const UserPost = () => {
  const id = parseInt(localStorage.getItem("id"));
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(`/post/user/${id}`);

      if (!data.status) {
        alert(data.message);
      }
      setPostData(data.data);
    })();
  }, []);
  return postData.length > 0 ? (
    <div className="max-w-[85vw] mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10 ">
      {postData.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center mt-10 max-w-6xl mx-auto p-5 rounded shadow-md bg-white text-gray-700">
      You have not any post.
    </div>
  );
};

export default UserPost;
