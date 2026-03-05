import { Router } from "express";
import CommentController from "../controllers/comment.controller.js";
const router = Router();
router.post("/", CommentController.addComment);
router.get("/:postId", CommentController.getCommentByUserId);

export default router;
