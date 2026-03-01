import CustomError from "../utils/customerError.js";
import DbService from "../models/base.service.js";
import db from "../models/index.js";
class PostController {
  constructor() {
    this.dbService = new DbService();
    this.post = db.models.Post;
  }
  add = async (req, res, next) => {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        throw new CustomError(404, "Data not found");
      }
      req.body.userId = req.userId;
      await this.dbService.create(this.post, req.body);
      return res.status(201).json({
        message: "Post created successfully",
      });
    } catch (e) {
      next(e);
    }
  };
  getById = async (req, res, next) => {
    try {
      const postId = req.params?.id;
      if (!postId) {
        throw new CustomError(404, "Id is not defined");
      }
      const postData = await this.dbService.findById(this.post, postId);
      return res.status(200).json({ status: true, data: postData });
    } catch (e) {
      return next(e);
    }
  };
  updateById = async (req, res, next) => {
    try {
      const postId = req.params?.id;
      const requestBody = req.body;
      if (!postId) {
        throw new CustomError(404, "Id is not defined");
      }
      await this.dbService.update(this.post, postId, requestBody);
      return res
        .status(200)
        .json({ status: true, message: "Post Update Succesfully" });
    } catch (e) {
      return next(e);
    }
  };
  deleteById = async (req, res, next) => {
    try {
      const postId = req.params?.id;
      if (!postId) {
        throw new CustomError(404, "Id is not defined");
      }
      await this.dbService.delete(this.post, postId);
      return res
        .status(200)
        .json({ status: true, message: "Post Deleted Succesfully" });
    } catch (e) {
      return next(e);
    }
  };
}
export default new PostController();
