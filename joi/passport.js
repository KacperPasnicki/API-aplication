import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as UsersService from "../modules/users/service.js";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRET;

const params = {
	secretOrKey: secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
	new Strategy(params, async (payload, done) => {
		try {
			const user = await UsersService.getById(payload._id);

			if (!user) return done(new Error("User not found"));
			if (user) {
				return done(null, user);
			}
		} catch (err) {
			return done(err);
		}
	})
);

export const auth = async (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user) => {
		let token = req.headers.authorization;

		if (!token) {
			return res.status(401).json({ message: "Not authorized" });
		}
		req.user = user;
		next();
	})(req, res, next);
};
