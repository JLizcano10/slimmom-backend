const passport = require("passport");
const passportJWT = require("passport-jwt");
const { Users } = require("../models/userSchema");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    Users.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("USer not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);
