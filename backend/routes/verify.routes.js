import { Router } from "express";

const router = Router();
router.get("/verify-token", (req, res, next) => {
  try {
    return res.status(200).json({ status: true, userId: req.userId });
  } catch (e) {
    return next(e);
  }
});
export default router;
