import passport from "passport";
import passportJWT  from "passport-jwt"
import { User } from "../modules/users/model.js";
// import * as UsersService from "../modules/users/service.js";

import dotenv from "dotenv"
dotenv.config();
const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
	secretOrKey: secret,
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
	new Strategy(params, async (payload, done) => {
	  try {
		const user = await User.find( {_id: payload.id});
		if (!user) return done(new Error("User not found"));
		if (user) {
		  return done(null, user);
		}
	  } catch (err) {
		return done(err);
	  }
	})
  );
  
 export const auth = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user) => {
	  const token = req.headers.authorization
	  if (token !== user.token || !user || err) {
		return res.status(401).json({ message: "Not authorized" });
	  }
	  req.user = user;
	  next();
	})(req, res, next);
  };