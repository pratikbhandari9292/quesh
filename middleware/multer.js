const multer = require("multer");

const getUpload = (size = 5) => {
	const upload = multer({
		limits: {
			fileSize: 1000000 * size,
		},
		fileFilter(request, file, cb) {
			if (
				file.originalname.endsWith(".jpg") ||
				file.originalname.endsWith(".jpeg") ||
				file.originalname.endsWith(".png")
			) {
				return cb(null, true);
			}

			cb(new Error("supported file types are .jpg, .jpeg and .png"));
		},
	});

	return upload;
};

module.exports = { getUpload };
