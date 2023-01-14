const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join("./models/contacts.json");

async function writeContacts() {
	const contacts = await fs.readFile(contactsPath);
	return JSON.parse(contacts);
}

const updateBody = (contact, body) => {
	const { name, email, phone } = body;

	return {
		...contact,
		name: name ? name : contact.name,
		email: email ? email : contact.email,
		phone: phone ? phone : contact.phone,
	};
};

const listContacts = async () => {
	const contacts = await writeContacts();
	return contacts;
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const requestedContact = contacts.find((contact) => contact.id === contactId);
	return requestedContact;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const filteredContacts = await contacts.filter(
		(contact) => contact.id !== contactId
	);

	await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2), {
		encoding: "utf-8",
	});
};

const addContact = async (body, name, email, phone) => {
	const contacts = await listContacts();
	const lastId = Math.max(...contacts.map((c) => parseInt(c.id, 10))) + 1;
	const newContact = { id: lastId.toString(), name, email, phone };
	const updateContacts = [...contacts, newContact];
	await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2), {
		encoding: "utf-8",
	});

	return updateContacts;
};

const updateContact = async (contactId, body) => {
	try {
		const contacts = await listContacts();
		const contact = await getContactById(contactId);
		const updatedContact = await updateBody(contact, body);
		const indexOfContact = await contacts.findIndex(
			(contact) => contact.id === contactId
		);
		await contacts.splice(indexOfContact, 1, updatedContact);
		const stringifyContacts = await JSON.stringify(contacts);
		await fs.writeFile(contactsPath, stringifyContacts);
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateBody,
};
