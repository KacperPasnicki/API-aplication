// import dotenv from "dotenv";
// import mongoose, { Schema } from "mongoose";

// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");

// dotenv.config();

// mongoose.connect(process.env.MONGO_URI, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

// process.on("SIGINT", () => {
// 	mongoose.disconnect();
// 	console.log("Database disconnected!");
// });

// const contactSchema = new Schema({
// 	name: {
// 		type: String,
// 		required: [true, "Set name for contact"],
// 	},
// 	email: {
// 		type: String,
// 	},
// 	phone: {
// 		type: String,
// 	},
// 	favorite: {
// 		type: Boolean,
// 		default: false,
// 	},
// });

// const Contact = mongoose.model("contact", contactSchema);

// const main = async () => {
// 	await Contact.find().then(console.log);
// };

// main().catch(console.error);

// const contactsRouter = require("./routes/api/contacts");

// const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

// app.use("/api/contacts", contactsRouter);

// app.use((req, res) => {
// 	res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
// 	res.status(500).json({ message: err.message });
// });

// module.exports = app;
