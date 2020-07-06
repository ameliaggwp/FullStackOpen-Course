// app.js module is designated for establishing a connection to the database
const { mongodb_uri } = require("./utils/config")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const cors = require("cors")
const { requestLogger, unknownEndpoint } = require("./utils/middleware")
const blogsRouter = require("./controllers/blogs")

app.use(express.json())
app.use(cors())

app.use("/api/blogs", blogsRouter)
app.use(requestLogger)
app.use(unknownEndpoint)

mongoose
  .connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message)
  })

module.exports = app
