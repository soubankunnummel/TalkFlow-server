const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
}); 

const upload = multer({ storage });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const postImage = (req, res, next) => {
    upload.single("img")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        try {
            if (!req.file) {
                console.log("File not provided");
                // return res.status(400).json({ error: "File not provided" });
                return next()
            }

            const result = await cloudinary.uploader.upload(req.file.path, {  
                folder: "TalkFlow-users",
            });

            console.log("Working from posimag middlw ware");
            req.body.img = result.secure_url;
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) {
                    console.log("Error deleting local file", unlinkErr);
                }
            });

            next();
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log("Error in image upload: ", error);
        }
    });
};

module.exports = postImage;
