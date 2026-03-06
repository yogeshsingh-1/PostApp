import CustomError from "../utils/customerError.js";
import db from "../models/index.js";
import DbService from "../models/base.service.js";
class LikeController {
  constructor() {
    this.dbService = new DbService();
    this.like = db.models.Like;
    this.post = db.models.Post;
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
          { transaction: t },
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

  // like = async (req, res, next) => {};
  addOrRemoveLike = async (req, res, next) => {
    const t = await db.sequelize.transaction();
    try {
      const { postId } = req.body;

      if (!postId) {
        throw new CustomError(200, "Input not validate");
      }
      // like
      const existingLike = await this.dbService.findOne(this.like, {
        where: {
          postId,
          userId: req.userId,
        },
        transaction: t,
      });

      if (existingLike) {
        // unlike
        await Promise.all([
          existingLike.destroy({ transaction: t }),

          this.post.decrement("likeCount", {
            by: 1,
            where: { postId },
            transaction: t,
          }),
        ]);

        await t.commit();

        return res.status(200).json({
          status: true,
          liked: false,
          message: "Like Removed!",
        });
      } else {
        // like
        await Promise.all([
          this.like.create(
            {
              postId,
              userId: req.userId,
            },
            { transaction: t },
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
          liked: true,
          message: "Like Added!",
        });
      }
    } catch (e) {
      await t.rollback();
      return next(e);
    }
  };
}
export default new LikeController();
