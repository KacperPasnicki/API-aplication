import { Contact } from "./model.js";

export const getAll = async () => Contact.find();

export const getById = async (id) => Contact.findById(id);

export const create = async (body) => Contact.create({ body });

export const exists = async (id) => Contact.exists({ _id: id });

export const update = async (id, { body }) => {
	Contact.findByIdAndUpdate(id, { body });
};
export const updateStatus = async (id, { body }) => {
	Contact.findByIdAndUpdate(id, body, { new: true });
};

export const deleteById = async (id) => Contact.findByIdAndDelete(id);
