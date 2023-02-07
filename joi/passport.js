import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as UsersService from "../modules/users/service.js";
import dotenv from "dotenv";
import { User } from "../modules/users/model.js";
dotenv.config();
const secret = process.env.SECRET;

// const ExtractJWT = passportJWT.ExtractJwt;
// const Strategy = passportJWT.Strategy;
const params = {
	secretOrKey: secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// passport.use(
// 	new Strategy(params, async (payload, done) => {
// 		try {
// 			const user = await UsersService.getById(payload._id);

// 			if (!user) return done(new Error("User not found"));
// 			if (user) {
// 				return done(null, user);
// 			}
// 		} catch (err) {
// 			return done(err);
// 		}
// 	})
// );
passport.use(
	new Strategy(params, function (payload, done) {
	  User.find({ _id: payload._id })
		.then(([user]) => {
		  if (!user) {
			return done(new Error('User not found'));
		  }
		  return done(null, user);
		})
		.catch(err => done(err));
	}),
  );

export const auth = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user) => {
		// const token = req.headers.authorization;
		// res.status(499).json({ message: "hello", user: token });
		if (!user || err) {
			return res.status(401).json({ message: "Not authorized" });
		}
		req.user = user;
		next();
	})(req, res, next);
};
