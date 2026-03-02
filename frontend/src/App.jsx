import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <div className="w-full h-screen bg">
        <SignIn />
      </div> */}
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
