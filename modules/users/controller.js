import { User } from "./model.js";
import * as UsersService from "./service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import { jimpAvatar } from "../../utils/jimpAvatar.js";
import {
	upload,
	UPLOAD_DIRECTORY,
	IMAGES_DIRECTORY,
} from "../../middlewares/upload.js";
import { v4 as uuidv4 } from "uuid";
import { verifyMail } from "../../utils/verifyMail.js";
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
	const verificationToken = uuidv4();
	if (user) return res.status(409).json({ message: "Email already in use" });

	try {
		const avatarURL = gravatar.url(email, { s: "150" });
		const newUser = new User({ email, avatarURL, verificationToken });
		newUser.setPassword(password);
		await newUser.save();
		await verifyMail(email, user.verificationToken);
		return res.status(201).json({
			user: {
				email,
				subscription: "starter",
				verificationToken: verificationToken,
				avatarURL: avatarURL,
			},
		});
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

		return res
			.status(200)
			.json({ token, mail: user.email, avatar: user.avatarURL });
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
		const user = await UsersService.getUser({
			user: req.headers.authorization,
		});

		if (!user) {
			return res.status(401).json({ message: "Not authorized" });
		}
		return res
			.status(200)
			.json({ user: user, subscription: user.subscription });
	} catch (error) {
		next(error);
	}
};

export const updateAvatars = async (req, res, next) => {
	const { path: IMAGES_DIRECTORY, filename } = req.file;
	const avatarURL = path.join(UPLOAD_DIRECTORY, filename);
	try {
		await jimpAvatar(IMAGES_DIRECTORY, avatarURL);
		// await fs.unlink(IMAGES_DIRECTORY);
		const user = UsersService.getUser({
			user: req.headers.authorization,
		});

		updateAvatar();
		res.status(200).json({ avatarURL: avatarURL });
	} catch (error) {
		await updateAvatar();
		next(error);
	}
};
const updateAvatar = async () => await fs.unlink(IMAGES_DIRECTORY);

export const verifyToken = async (req, res, next) => {
	try {
		const { verificationToken } = req.params;
		const user = await UsersService.getUser({ verifyToken: verificationToken });
		if (!user) {
			res.status(404).json({ message: "User not found" });
		}
		await User.findByIdAndUpdate(user._id, {
			verificationToken: null,
			verify: true,
			new: true,
		});
		res.status(200).json({ message: "Verification successful" });
	} catch (error) {
		next(error);
	}
};
export const ReVerifyToken = async (req, res, next) => {
	const { email } = req.body;
	try {
		const user = await UsersService.getUser({ email: email });

		if (!user) {
			res.status(404).json({ message: "User not found" });
		}
		if (user.verificationToken) {
			res.status(400).json({ message: "Verification has already been passed" });
		}
		await verifyMail(email, user.verificationToken);
		res.status(200).json({ message: "Verification email sent" });
	} catch (e) {
		next(e);
	}
};
