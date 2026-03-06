import { Router } from "express";
import LikeController from "../controllers/like.controller.js";
const router = Router();
router.post("/", LikeController.addOrRemoveLike);

export default router;
