import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./config/passport.js"; // passport strategies
import cookieParser from "cookie-parser";
import corsOption from "./utils/corsOption.js";
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

export default app;
