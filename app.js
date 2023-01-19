import express from "express";
import cors from "cors";
import logger from "morgan"
import { api } from "./routes/api/contacts.js";
export const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
// app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/contacts", api);

app.use((_, res) => {
	res.status(404).json({
		status: "error",
		code: 404,
		message: `That site doesn't exist`,
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
