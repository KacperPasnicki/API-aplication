import Jimp from "jimp";

export const jimpAvatar = (path, cb) => {
	return Jimp.read(path)
		.then((avatar) => {
			avatar.resize(256, 256).quality(60).write(cb) // resize
			// set JPEG quality
		})
		.catch((err) => {
			console.error(err);
		});
};
