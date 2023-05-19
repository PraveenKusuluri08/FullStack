const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema(
  { isRead: false },
  { strict: false }
)

module.exports = mongoose.model("Notification", notificationSchema)
