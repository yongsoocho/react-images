const { Router } = require("express")
const imageRouter = Router()
const { v4: uuid } = require("uuid")
const path = require("path")
const multer = require("multer")
const Image = require("../models/images")

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
    cb(null, "./uploads")
  },
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname)
		const basename = path.basename(file.originalname, ext)
		cb(null, uuid()+basename+ext)
  }
})
const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		if(
			path.extname(file.originalname) === '.jpeg' ||
			path.extname(file.originalname) === '.jpg'
		) { cb(null, true) }
		else { cb(new Error("Invalid file type"), false) }
	}
})

imageRouter.get("/images", async (req, res) => {
	const images = await Image.find()
	return res.json(images)
})
imageRouter.post("/upload", upload.single("image"), async (req, res) => {
	const newImage = await new Image({
		key: req.file.filename,
		originalFileName: req.file.originalname
	}).save()
	
	return res.json(newImage)
})

module.exports = imageRouter