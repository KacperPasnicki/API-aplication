import path from "path";
import multer from "multer";

export const UPLOAD_DIRECTORY = path.join(process.cwd(), "public", "avatars");
export const IMAGES_DIRECTORY = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, IMAGES_DIRECTORY);
	},
	filename: (req, file, callback) => {
		const _id = req.user._id.toString();

		const name = [_id, file.originalname].join("_");
		callback(null, name);
	},
	limits: { fileSize: 1_048_576 },
});

export const upload = multer({ storage });
