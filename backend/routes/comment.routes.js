import { Router } from "express";
import CommentController from "../controllers/comment.controller.js";
const router = Router();
router.get("/:postId", CommentController.getCommentByUserId);

export default router;
