const {
  sendMessage,
  getAllMessages,
} = require("../Controller/messageController")
const { sendNotification } = require("../Controller/notificationController")
const endPoint = require("../middlewares/endpoint")

const router = require("express").Router()

router.post("/", endPoint, sendMessage)

router.get("/:chatId", endPoint, getAllMessages)

module.exports = router
