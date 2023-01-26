import passport from "passport";
import passportJWT from "passport-jwt";
import { User } from "../modules/users/model.js";
import jwt from "jsonwebtoken";

const secret = "secret word";

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
	secretOrKey: secret,
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
	new Strategy(params, function (payload, done) {
		User.find({ _id: payload.id })
			.then(([user]) => {
				if (!user) {
					return done(new Error("User not found"));
				}
				return done(null, user);
			})
			.catch((err) => done(err));
	})
);

export const auth = (req, res, next) => {
	passport.auth("jwt", { session: false }, (error, user) => {
		if (!user || error) {
			return res.status(401).json({
				status: "error",
				code: 401,
				message: "Unauthorized",
				data: "Unauthorized",
			});
		}
		req.user = user;
		next();
	})(req, res, next);
};
