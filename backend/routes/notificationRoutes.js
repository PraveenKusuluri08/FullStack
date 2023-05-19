const router = require("express").Router()
const {
  sendNotification,
  getAllNotifications,
  setNotificationToRead,
} = require("../Controller/notificationController")
const endPoint = require("../middlewares/endpoint")

router.post("/newnotification", endPoint, sendNotification)

router.get("/getAllNotifications", getAllNotifications)

router.put("/readNotification", setNotificationToRead)

module.exports = router
