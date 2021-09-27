const { Router } = require("express")
const userRouter = Router()
const User = require("../models/user")
const bcrypt = require('bcrypt')

userRouter.post("/register", async (req, res) => {
	const hash = await bcrypt.hash(req.body.password, 12)
	const user = await new User({ ...req.body, password: hash, sessions: [{ createdAt: new Date() }] }).save()
	const { _doc: payload } = user
	return res.json({ ...payload, sessionId: payload.sessions[0], password: "*" })
})

userRouter.post("/login", async (req, res) => {
	const user = await User.findOne({ username: req.body.username })
	const isValid = await bcrypt.compare(req.body.password, user.password)
	if(!isValid) { return res.json() }
	user.sessions.push({ createdAt: new Date() })
	const sessionId = user.sessions[user.sessions.length-1]
	await user.save()
	const { _doc: payload } = user
	return res.json({ ...payload, sessionId, password: "*" })
})

userRouter.patch("/logout", async (req, res) => {
	const { sessionid } = req.headers
	const user = await User.findOne({ "sessions.createdAt": sessionid })
	await User.updateOne(
		{ _id: user._id },
		{ $pull: { sessions: { createdAt: sessionid } } }
	)
	return res.json({})
})

module.exports = userRouter