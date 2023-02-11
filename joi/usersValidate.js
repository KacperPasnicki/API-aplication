import { userSchema } from "./userSchema.js";

export const validate = (userSchema) => {
	return (req, res, next) => {
		const { error } = userSchema.validate(req.body);
		if (error) {
			error.status = 400;
			next(error);
		}
		next();
	};
};
const validator = (schema) => (body) => {
	return schema.validate(body, { abortEarly: false });
  };

 export const userValidate = validator(userSchema);