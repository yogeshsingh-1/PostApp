import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "../models/index.js";
import { raw } from "express";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? "323",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "343",
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const profileData = {
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          googleId: profile.id,
          avatar: profile.photos?.[0]?.value,
          isEmailVerified: true, // OAuth se aaya email verified
          password: null, // nullable for Google login
        };
        let user = await db.models.User.findOne({
          where: { googleId: profile.id },
          raw: true,
        });

        if (!user) {
          user = await db.models.User.create(profileData, { raw: true });
        }
        console.log(user);
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
