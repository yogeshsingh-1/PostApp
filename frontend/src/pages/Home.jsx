import { useContext } from "react";
import Axios from "../utils/axiox.utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
const Home = () => {
  const string =
    "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D";
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-6 w-[94%] mx-auto h-[75vh] rounded-xl overflow-hidden shadow-lg bg-white flex">
        <img
          src={string}
          alt="post"
          className="h-full w-3/5 object-fill bg-black"
        />

        <div className="w-2/5 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-zinc-800 mb-3 ">
            Share Your Thoughts with the World!
          </h2>

          <p className="text-zinc-400 leading-relaxed text-xs font-medium ">
            Our blogging platform allows you to create and publish your own
            blogs easily. Write about your ideas, experiences, or knowledge and
            share them with a growing community of readers. Other users can
            explore your posts, leave comments, and join meaningful discussions.
            Start writing today and connect with people who share the same
            interests.
          </p>

          <button
            className="mt-6 w-fit bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition "
            onClick={() => navigate("/post")}
          >
            Read More...
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
