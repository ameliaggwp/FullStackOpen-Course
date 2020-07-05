const http = require("http")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const { port, mongodb_uri } = require("./utils/config")

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model("Blog", blogSchema)

mongoose.connect(mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/api/blogs", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

app.post("/api/blogs", (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then((result) => {
    res.status(201).json(result)
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
