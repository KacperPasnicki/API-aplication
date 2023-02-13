import { Router } from "express";
import * as usersController from "../../modules/users/controller.js";
import { validateData } from "../../joi/validate.js";
import { auth } from "../../joi/passport.js";
import { userValidate } from "../../joi/usersValidate.js";
import { upload } from "../../middlewares/upload.js";

export const usersRouter = Router();

usersRouter.post("/signup", validateData(userValidate), usersController.signup);
usersRouter.post("/login", validateData(userValidate), usersController.login);
usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/current", auth, usersController.current);
usersRouter.get("/logout", auth, usersController.logout);
usersRouter.patch(
	"/avatars",
	auth,
	upload.single("avatar"),
	usersController.updateAvatars
);
usersRouter.get("/verify/:verificationToken", usersController.verifyToken)
usersRouter.post("/verify/:verificationToken", usersController.verifyToken)