import DbService from "../models/base.service.js";
import db from "../models/index.js";
import CustomError from "../utils/customerError.js";
import cookieOption from "../utils/cookieOption.utils.js";
import jwtUtils from "../utils/jwt.utils.js";
class AuthController {
  dbService;
  user;
  constructor() {
    this.dbService = new DbService();
    this.user = db.models.User;
  }
  signup = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw new CustomError(200, "Input not validate");
      }
      const user = await this.findByFieldName("email", email);
      if (user) {
        throw new CustomError(404, "User email already exist");
      }
      const result = await this.dbService.create(this.user, req.body);
      const token = jwtUtils.createJWT({ id: result?.id });
      res.cookie("token", token, cookieOption);
      return res
        .status(201)
        .json({ status: true, message: "User created succesfully" });
    } catch (e) {
      return next(e);
    }
  };
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new CustomError(200, "Give me right inputs");
      }
      const user = await this.findByFieldName("email", email);
      if (!user) {
        throw new CustomError(404, "User not found");
      }
      const token = jwtUtils.createJWT({ id: user?.id });
      res.cookie("token", token, cookieOption);
      return res
        .status(200)
        .json({ status: true, message: "Login Succesfully" });
    } catch (e) {
      return next(e);
    }
  };
  logOut = async (req, res) => {
    try {
      res.clearCookie("token", cookieOption);
      return res
        .status(200)
        .json({ status: true, message: "Logout succesfully" });
    } catch (e) {
      next(e);
    }
  };
  findByFieldName = async (fieldName, value) => {
    return await this.dbService.findByFieldName(this.user, fieldName, value);
  };
}

export default new AuthController();
