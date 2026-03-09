import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import Axios from "../utils/axiox.utils";
import { Typography } from "@mui/material";
const Posts = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    })();
  }, []);
  if (loading)
    return (
      <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  return (
    <>
      <div className="max-w-[85vw] mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10 ">
        {postData.length > 0 ? (
          postData.map((post) => (
            <Post key={post.postId} post={post} admin={post} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-semibold text-zinc-700">
              No Posts Available
            </h2>
            <p className="text-zinc-500 mt-2">
              There are currently no posts to display.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
