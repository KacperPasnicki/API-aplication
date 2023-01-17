import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { api } from "./routes/api/contacts.js";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DB_HOST;
dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", api);

app.use((_, res, __) => {
	res.status(404).json({
		status: "error",
		code: 404,
		message: "Use api on routes: /api/tasks",
		data: "Not found",
	});
});

app.use((err, _, res, __) => {
	console.log(err.stack);
	res.status(500).json({
		status: "fail",
		code: 500,
		message: err.message,
		data: "Internal Server Error",
	});
});

app.listen(30000, () => {
	mongoose
		.connect(MONGO_URI, {
			promiseLibrary: global.Promise,
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(() => {
			app.listen(PORT, function () {
				console.log(`Server running. Use our API on port: ${PORT}`);
			});
		});
});
