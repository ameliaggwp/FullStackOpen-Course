require("dotenv").config()

module.exports = {
  mongodb_uri: process.env.MONGODB_URI,
  port: process.env.PORT,
}
