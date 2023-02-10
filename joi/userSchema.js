import joi from "joi";

export const userSchema = joi.object({
	name: joi.string(),
	email: joi.string().email(),
	password: joi.string(),
	token: joi.string(),
});
