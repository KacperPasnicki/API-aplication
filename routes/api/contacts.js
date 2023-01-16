const express = require("express");
const router = express.Router();
const validate = require("../../joi/validate");
const contactsSchema = require("../../joi/contactsSchema");
const validateMiddleware = validate(contactsSchema);

const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	updateBody,
} = require("./../../models/contacts");

router.get("/", async (req, res, next) => {
	const contacts = await listContacts();
	res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;
	const requestedContact = await getContactById(contactId);
	if (!requestedContact) {
		res.status(404).json({ message: `Not found Id: ${contactId}` });
	}
	res.status(200).json(requestedContact);
});

router.post("/", async (req, res, next) => {
	const { name, email, phone } = req.body;
	await validateMiddleware;
	if (!name || !email || !phone) {
		res.status(400).json({ message: "missing required name field" });
	}
	const newContact = await addContact(req.body, name, email, phone);

	res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;
	const requestedContact = await getContactById(contactId);
	if (!requestedContact) {
		res.status(404).json({ message: "Not found" });
	}
	await removeContact(contactId);
	res.status(200).json({ message: `contact nr ${contactId} deleted` });
});

router.put("/:contactId", async (req, res, next) => {
	const { name, email, phone } = req.body;
	const { contactId } = req.params;
	await validateMiddleware;
	if (!name && !email && !phone)
		return res.status(400).json({ message: "missing fields" });
	const contact = await getContactById(contactId);
	if (!contact) return res.status(404).json({ message: "Not found" });
	const updatedContact = await updateBody(contact, req.body);
	await updateContact(contactId, req.body);
	res.status(200).send(updatedContact);
});

module.exports = router;
