const { port, mongodb_uri } = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("./utils/logger")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs")

app.use("/api/blogs", blogsRouter)
app.use(cors())
app.use(express.json())

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

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})
