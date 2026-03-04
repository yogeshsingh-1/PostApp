import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import PublicRoute from "./auth/PublicRoute";
import ProtectedRoute from "./auth/ProtectedRoute";
import Posts from "./pages/Posts";
import PostEdit from "./pages/PostEdit";
import NewPost from "./pages/NewPost";
import SinglePost from "./pages/SinglePost";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Posts />} />
        <Route path="/post/new" element={<NewPost />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/post/update/:postId" element={<PostEdit />} />
        <Route path="/logout" element={<Logout />} />
      </Route>

      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
