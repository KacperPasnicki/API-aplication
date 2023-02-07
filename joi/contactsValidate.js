export const validate = (contactsSchema) => {
	return (req, res, next) => {
		const { error } = contactsSchema.validate(req.body);
		if (error) {
			error.status = 400;
			next(error);
		}
		next();
	};
};
