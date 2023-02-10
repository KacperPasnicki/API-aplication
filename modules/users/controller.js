import { User } from "./model.js";
import * as UsersService from "./service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRET;

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		console.error(error.message);
		next(error);
	}
};

export const signup = async (req, res, next) => {
	const { email, password } = req.body;

	const user = await UsersService.getUser({ email });

	if (user) return res.status(409).json({ message: "Email already in use" });

	try {
		const newUser = new User({ email });
		newUser.setPassword(password);
		await newUser.save();
		return res.status(201).json({ user: { email, subscription: "starter" } });
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await UsersService.getUser({ email });

		if (!user || !user.validatePassword(password))
			return res.status(401).json({ message: "invalid credentials" });

		const payload = {
			id: user._id,
			email: user.email,
		};
		const token = jwt.sign(payload, secret, { expiresIn: "24h" });
		await User.findByIdAndUpdate(user._id, { token });

		return res.status(200).json({ token, user: user, userToken: user.token });
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res, next) => {
	try {
		const user = await UsersService.getUser({
			user: req.headers.authorization,
		});
		if (!user) {
			return res.status(401).json({ message: " Not authorized" });
		}
		await User.findByIdAndUpdate(user._id, { token: null });
		return res.status(204).json({ message: "No content", user: user });
	} catch (error) {
		next(error);
	}
};

export const current = async (req, res, next) => {
	try {
		// let token =  await req.headers.authorization;
		const user = await UsersService.getUser({
			user: req.headers.authorization,
		});

		if (!user) {
			return res.status(401).json({ message: "Not authorized" });
		}
		return res
			.status(200)
			.json({ user: user.email, subscription: user.subscription });
	} catch (error) {
		next(error);
	}
};
// export const updateSubscription = async (req, res, next) => {
// 	try{

// 	}
// 	catch (error){
// 		next(error)
// 	}

// };
