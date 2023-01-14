const Joi = require("joi");

const contactsSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email(),
	phone: Joi.string(),
});

module.exports = contactsSchema;
