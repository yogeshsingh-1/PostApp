import CustomError from "../utils/customerError.js";
import db from "../models/index.js";
import DbService from "../models/base.service.js";
import post from "../models/post.js";
class CommentController {
  constructor() {
    this.dbService = new DbService();
    this.comment = db.models.Comment;
    this.user = db.models.User;
  }
  addComment = async (req, res, next) => {
    try {
      const { comment, postId } = req.body;
      if (!comment || !postId) {
        throw new CustomError(200, "Input not validate");
      }
      await this.dbService.create(this.comment, {
        comment,
        postId,
        userId: req.userId,
      });
      return res.status(200).json({ status: true, message: "Comment Added!" });
    } catch (e) {
      return next(e);
    }
  };
  getCommentByUserId = async (req, res, next) => {
    try {
      const id = req.params.postId;
      if (!id) {
        throw new CustomError(200, "Post Id Is not found");
      }
      const commentData = await this.dbService.findAll(this.comment, {
        // raw: true,
        where: { postId: id },
        include: [{ model: this.user, attributes: ["name"] }],
      });
      console.log(commentData);
      return res.status(200).json({ status: true, data: commentData });
    } catch (e) {
      return next(e);
    }
  };
}
export default new CommentController();
