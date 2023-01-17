import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app.js";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DB_HOST;
dotenv.config();

mongoose
	.connect(process.env.DB_HOST, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, function () {
			console.log(`Server running. Use our API on port: ${PORT}`);
		});
	});
