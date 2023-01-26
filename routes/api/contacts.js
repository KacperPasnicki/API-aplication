import { Router } from "express";
import * as ContactsController from "../../modules/contacts/controller.js";

export const contactsRouter = Router();

contactsRouter.get("/", ContactsController.getAllContacts);

contactsRouter.get("/:contactId", ContactsController.getContactById);

contactsRouter.post("/", ContactsController.createContact);

contactsRouter.delete("/:contactId", ContactsController.deleteContact);

contactsRouter.put("/:contactId", ContactsController.updateContacts);

contactsRouter.patch("/:contactId/favorite", ContactsController.updateStatus);


