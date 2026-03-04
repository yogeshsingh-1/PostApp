import { useEffect, useState } from "react";
import Post from "../components/Post";
import Axios from "../utils/axiox.utils";
const Posts = () => {
  const [postData, setPostData] = useState([]);
  // const postsData = [
  //   {
  //     id: 1,
  //     title: "Beautiful Nature",
  //     description: "This is a blog about nature.",
  //     author: "John",
  //     image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  //   },
  //   {
  //     id: 2,
  //     title: "Mountain View",
  //     description: "Mountains are amazing.",
  //     author: "Alice",
  //     image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  //   },
  //   {
  //     id: 3,
  //     title: "City Life",
  //     description: "City lights and lifestyle.",
  //     author: "Mike",
  //     image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  //   },
  //   {
  //     id: 4,
  //     title: "City Life",
  //     description: "City lights and lifestyle.",
  //     author: "Mike",
  //     image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  //   },
  //   {
  //     id: 3,
  //     title: "City Life",
  //     description: "City lights and lifestyle.",
  //     author: "Mike",
  //     image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  //   },
  //   {
  //     id: 3,
  //     title: "City Life",
  //     description: "City lights and lifestyle.",
  //     author: "Mike",
  //     image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  //   },
  // ];
  useEffect(() => {
    (async () => {
      const { data } = await Axios.get("/post/all");
      if (data.status) {
        setPostData(data.data);
      }
    })();
  }, []);

  return (
    <div className="max-w-[85vw] mx-auto mt-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {postData.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  );
};

export default Posts;
