const app = require("./app")
const http = require("http")
const { port } = require("./utils/config")
const logger = require("./utils/logger")

const server = http.createServer(app)

server.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})
