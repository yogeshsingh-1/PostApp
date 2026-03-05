import CustomError from "../utils/customerError.js";
import db from "../models/index.js";
import DbService from "../models/base.service.js";
import post from "../models/post.js";
class LikeController {
  constructor() {
    this.dbService = new DbService();
    this.like = db.models.Comment;
    this.post = db.models.post;
  }
  addLike = async (req, res, next) => {
  const t = await db.sequelize.transaction();

  try {
    const { postId } = req.body;

    if (!postId) {
      throw new CustomError(200, "Input not validate");
    }

    await Promise.all([
      this.dbService.create(
        this.like,
        {
          postId,
          userId: req.userId,
        },
        { transaction: t }
      ),

      this.post.increment("likeCount", {
        by: 1,
        where: { postId },
        transaction: t,
      }),
    ]);

    await t.commit();

    return res.status(200).json({
      status: true,
      message: "Like Added!",
    });

  } catch (e) {
    await t.rollback();
    return next(e);
  }
};
}
export default new LikeController();
