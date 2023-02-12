import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
// dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

const msg = (email, verificationToken) => {
	return {
		to: "email",
		from: "kacper.pas@hotmail.com",
		subject: "verificationToken",
		text: `Its your's verify Token below! enjoy :)`,
		html: `Your verify path : http://localhost:3000//users/verify/&{verificationToken}!`,
	};
};

export const verifyMail = async (email, verificationToken) => {
	await sgMail
		.send(msg(email, verificationToken))
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.error(error);
		});
};
