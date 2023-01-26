import { Router } from "express";
import * as usersController from "../../modules/users/controller.js";
import { validateData } from "../../joi/validate.js";
import { auth } from "../../joi/passport.js";

export const usersRouter = Router();

usersRouter.post("/signup",  usersController.signup);
usersRouter.post("/login",  usersController.login);
usersRouter.get("/", usersController.getAllUsers);
// usersRouter.patch("/", auth, usersController.update);
// usersRouter.get("/current", auth, usersController.current);
// usersRouter.get("/logout", auth, usersController.logout);
