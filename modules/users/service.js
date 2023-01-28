import { User } from "./model.js";


export const getUser = async (body) => User.findOne(body);

export const getById = async (id) => User.findById(id);

export const update = async (id, body ) => {
	User.findByIdAndUpdate(id, body, { new: true });
};