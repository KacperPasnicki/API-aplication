import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app.js";
import { IMAGES_DIRECTORY, UPLOAD_DIRECTORY } from "./middlewares/upload.js";
import { initializeDirectory } from "./utils/utils.js";

const PORT = process.env.PORT || 3000;

dotenv.config();

mongoose
	.connect(process.env.DB_HOST, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, async  () => {
			await initializeDirectory(UPLOAD_DIRECTORY);
			await initializeDirectory(IMAGES_DIRECTORY)
			console.log(`Server running. Use our API on port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(`Server not running. Error message: ${error.message}`);
		process.exit(1);
	});
