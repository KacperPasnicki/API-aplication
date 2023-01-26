export const validate = (usersSchema) => {
	return (req, res, next) => {
		const { error } = usersSchema.validate(req.body);
		if (error) {
			error.status = 400;
			next(error);
		}
		next();
	};
};
