import fs from 'fs'
import path from 'path'
import multer from 'multer'
import {v2 as cloudinary} from 'cloudinary';

const storage = multer.diskStorage({

    destination: path.join(__dirname,'uploads'),
    filename:(req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({storage})
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
 })

const imageUpload = (req, res, next) => {
    upload.single("image")(req, res, async(err) => {
        if(err) {
            return res.status(400).json({error : err.message})
        }
        try {
            const result = await cloudinary.uploader(req.file.path, {
                folder:"TalkFlow-users"
            })
            req.body.image = result.secure_url
            // fs.unlink(req.file.path, (unliker) => {
            //     if (unliker){
            //         console.log("Error deleting local file", unliker);
            //     }
            // })
            next()
        } catch (error) {
            res.status(500).json({ error: error.message });
		    console.log("Error in image upload: ", error.message);
        }
    })
}

 
export default imageUpload