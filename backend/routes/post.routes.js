import { Router } from "express";
import PostController from "../controllers/post.controller.js";
const router = Router({ mergeParams: true });
router.post("/", PostController.add);
router.put("/:id", PostController.updateById);
router.get("/:id", PostController.getById);
router.delete("/:id", PostController.deleteById);

export default router;
