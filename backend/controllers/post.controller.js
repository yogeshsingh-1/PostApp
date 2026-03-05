import CustomError from "../utils/customerError.js";
import DbService from "../models/base.service.js";
import db from "../models/index.js";
class PostController {
  constructor() {
    this.dbService = new DbService();
    this.post = db.models.Post;
    this.user = db.models.User;
    this.like = db.models.Like;
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
        status: true,
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
      const postData = await this.dbService.findById(this.post, postId, {
        include: [{ model: this.user, attributes: ["name"] }],
      });
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
      const postData = await this.dbService.findById(this.post, postId);
      if (postData.userId !== req.userId) {
        throw new CustomError(403, "You are not author of this post");
      }
      await this.dbService.update(this.post, postId, requestBody);
      return res
        .status(200)
        .json({ status: true, message: "Post Updated Succesfully" });
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
  getAllPost = async (req, res, next) => {
    try {
      // required: false
      // Parent data (Post) हमेशा आएगा, चाहे child table (Like) में record हो या ना हो।
      // SQL में यह LEFT JOIN जैसा behave करता है।
      const postData = await this.dbService.findAll(this.post, {
        include: [
          { model: this.user, attributes: ["name"] },
          {
            model: this.like,
            attributes: ["likeId", "userId"],
            where: {
              userId: req.userId,
            },
            required: false,
          },
        ],
      });

      return res.status(200).json({ status: true, data: postData });
    } catch (e) {
      console.log(e);
      return next(e);
    }
  };
  updateLikeCount = async (req, res, next) => {
    try {
      const postId = req.params?.id;
      if (!postId) {
        throw new CustomError(200, "Id is not defined");
      }
      const postData = await this.dbService.findById(this.post, postId);
      await this.dbService.update(this.post, postId, {
        likeCount: postData.likeCount + 1,
      });
      return res.status(200).json({ status: true, data: postData });
    } catch (e) {
      console.log(e);
      return next(e);
    }
  };
  getUserData = async (req, res, next) => {
    try {
      const userId = req.params?.userId;
      if (!userId) {
        throw new CustomError(200, "Id is not defined");
      }
      const postData = await this.dbService.findAll(this.post, {
        where: { userId: userId },
        include: [
          { model: this.user, attributes: ["name", "id"] },
          {
            model: this.like,
            attributes: ["likeId", "userId"],
            where: {
              userId: req.userId,
            },
            required: false,
          },
        ],
      });
      return res.status(200).json({ status: true, data: postData });
    } catch (e) {
      return next(e);
    }
  };
}
export default new PostController();
