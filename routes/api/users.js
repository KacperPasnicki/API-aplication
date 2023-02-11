import { Router } from "express";
import * as usersController from "../../modules/users/controller.js";
import { validateData } from "../../joi/validate.js";
import { auth } from "../../joi/passport.js";
import { userValidate } from "../../joi/usersValidate.js";

export const usersRouter = Router();

usersRouter.post("/signup", validateData(userValidate), usersController.signup);
usersRouter.post("/login", validateData(userValidate), usersController.login);
usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/current", auth, usersController.current);
usersRouter.get("/logout", auth, usersController.logout);
usersRouter.patch("/avatars", auth, usersController.updateAvatars)