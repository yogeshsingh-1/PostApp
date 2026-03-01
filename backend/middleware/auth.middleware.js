// const authMiddleware = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect("/");
//   }
// };
import CustomError from "../utils/customerError.js";
import jwtUtils from "../utils/jwt.utils.js";
const authMiddleware = (req, res, next) => {
  // const authHeader = req.headers.authorization;
  const token = req.cookies?.token;

  if (!token) {
    return next(new CustomError(401, "Unauthorized"));
  }
  const userData = jwtUtils.verifyJWT(token);
  req.userId = userData.id;
  return next();
};
export default authMiddleware;
