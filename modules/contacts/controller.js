import * as ContactsService from "./service.js";
import { validate } from "../../joi/contactsValidate.js";
import { contactsSchema } from "../../joi/contactsSchema.js";

const validateMiddleware = validate(contactsSchema);

export const getAllContacts = async (req, res, next) => {
	try {
		const contacts = await ContactsService.getAll();
		res.status(200).json(contacts);
	} catch (error) {
		console.error(error.message);
		next(error);
	}
};

export const getContactById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const requestedContact = await ContactsService.getById(contactId);
		if (!requestedContact) {
			res.status(404).json({ message: `Not found Id: ${contactId}` });
		}
		res.status(200).json(requestedContact);
	} catch (error) {
		console.error(error.message);
		next(error);
	}
};

export const createContact = async (req, res) => {
	const { name, email, phone } = req.body;
	await validateMiddleware;
	if (!name || !email || !phone) {
		res.status(400).json({ message: "missing required name field" });
	}
	const newContact = await ContactsService.create(req.body, name, email, phone);

	res.status(201).json(newContact);
};

export const updateContacts = async (req, res) => {
	const { name, email, phone } = req.body;
	const { contactId } = req.params;
	await validateMiddleware;
	if (!name && !email && !phone)
		return res.status(400).json({ message: "missing fields" });
	const contact = await ContactsService.exists(contactId);
	if (!contact) return res.status(404).json({ message: "Not found" });
	const updatedContact = await ContactsService.update(contact, req.body);
	await ContactsService.update(contactId, req.body);
	res.status(200).send(updatedContact);
};

export const updateStatus = async (req, res, next) => {
	try {
		const { favorite } = req.body;
		const { contactId } = req.params;
		await validateMiddleware();
		if (favorite === undefined || favorite === null) 
			return res.status(400).json({ message: "missing field" });

		const updatedStatus = await ContactsService.updateStatusContact(contactId, req.body);
		if (!updatedStatus) return res.status(404).json({ message: "Not found" })
		res.status(200).send(updatedStatus);
	} catch (error) {
		console.error(error.message);
		next(error);
	}
};

export const deleteContact = async (req, res) => {
	const { contactId } = req.params;
	const requestedContact = await ContactsService.exists(contactId);
	if (!requestedContact) {
		res.status(404).json({ message: "Not found" });
	}
	await ContactsService.deleteById(contactId);
	res.status(200).json({ message: `contact nr ${contactId} deleted` });
};
