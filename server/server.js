const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const imageRouter = require("./router/router.js")
const userRouter = require("./router/user.js")

const app = express()
const PORT = 5000
dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log("Mongo DB is connected!"))
.catch(error => console.log("Mongo DB on Error!", error))
mongoose.set('debug', true)

app.use(cors({ origin:"*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // true:qs , false:query-string
app.use("/upload", express.static("uploads"))
app.use("/", imageRouter)
app.use("/user", userRouter)

app.listen(PORT, () => console.log("Express server listening on PORT: " + PORT));