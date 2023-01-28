import { model, Schema } from "mongoose";
import bCrypt from "bcryptjs";

export const usersSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
	}
);

usersSchema.methods.setPassword =  function (password) {
	this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

usersSchema.methods.validatePassword = async function (password) {
	return bCrypt.compareSync(password, this.password);
};

export const User = model("user", usersSchema);
