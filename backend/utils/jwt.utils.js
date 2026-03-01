import jwt from "jsonwebtoken";
import CustomError from "./customerError.js";
class JWTUtils {
  createJWT = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET ?? "secret", {
      expiresIn: "5h",
    });
  };

  verifyJWT = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET ?? "secret");
    } catch (error) {
      throw new CustomError(401, "Token Expired");
    }
  };
}

export default new JWTUtils();
