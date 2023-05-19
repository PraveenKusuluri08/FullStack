const mongoose = require("mongoose")

const DbConnection = async () => {
  const URI = process.env.MONGO_URI
  mongoose.connect(URI, { useUnifiedTopology: true })

  const connection = mongoose.connection
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully")
  })
}

module.exports = DbConnection
