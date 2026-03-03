import { redirect } from "react-router-dom";
import Axios from "axios";

const GuestLoader = async () => {
  try {
    await Axios.get("/auth/me", { withCredentials: true });
    return redirect("/dashboard");
  } catch {
    return null;
  }
};
export default GuestLoader;
