const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (req, res) => {
  const body = req.body
  if (body.password === undefined) {
    return res.status(400).json({ error: "Password required" })
  } else if (body.password.length < 3) {
    return res
      .status(400)
      .json({ error: "Password should be 3 characters or longer" })
  }
  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  })
  res.json(users)
})

module.exports = usersRouter
