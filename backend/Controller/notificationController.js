const notificationModel = require("../models/notificationModel")

const sendNotification = async (req, res) => {
  let { message } = req.body
  console.log(message)
  try {
    let notification = await notificationModel.create({ message })
    return res.status(200).json(notification)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
}

const getAllNotifications = async (req, res) => {
  await notificationModel
    .find()
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((err) => {
      console.log(err)
      return res.status(404).json(err)
    })
}

const setNotificationToRead = async (req, res) => {
  const { notificationId } = req.body
  try {
    let notification = await notificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true }
    )
    return res.status(202).json(notification)
  } catch (err) {
    return res.status(400).json(err)
  }
}

module.exports = {
  sendNotification,
  getAllNotifications,
  setNotificationToRead,
}
