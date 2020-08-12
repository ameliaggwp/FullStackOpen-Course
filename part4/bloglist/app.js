// app.js module is designated for establishing a connection to the database
const { MONGODB_URI } = require("./utils/config")
const express = require("express")
require("express-async-errors")
const app = express()
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const cors = require("cors")
const middleware = require("./utils/middleware")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

mongoose
  .connect(MONGODB_URI, {
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
