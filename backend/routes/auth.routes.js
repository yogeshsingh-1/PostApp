import express from "express";
import passport from "passport";
import AuthController from "../controllers/auth.controller.js";
import CustomError from "../utils/customerError.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send(
//     "<h1>Welcome to the Google OAuth Demo</h1><a href='/auth/google'>Login with Google</a>"
//   );
// });

// auth start
router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signIn);
router.get("/logout", AuthController.logOut);

// auth end

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/profile",
  })
);

router.get("/profile", (req, res) => {
  res.json(req.user ?? "Missing user data");
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

export default router;
