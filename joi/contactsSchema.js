import Joi from "joi";

export const contactsSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email(),
	phone: Joi.string(),
});
