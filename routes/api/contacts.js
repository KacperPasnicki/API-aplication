import { Router } from "express";
import * as ContactsController from "../../modules/contacts/controller.js";

export const api = Router();

api.get("/", ContactsController.getAllContacts);

api.get("/:contactId", ContactsController.getContactById);

api.post("/", ContactsController.createContact);

api.delete("/:contactId", ContactsController.deleteContact);

api.put("/:contactId", ContactsController.updateContact);
