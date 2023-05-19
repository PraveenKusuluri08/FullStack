const Messages = require("../models/messageModel")
const User = require("../models/userModel")
const Chat = require("../models/chatModel")

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body

  if (!content || !chatId) {
    return res.status(404).json({ message: "Invalid request Please try again" })
  }
  let newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  }

  try {
    let message = await Messages.create(newMessage)

    message = await message.populate("sender", "firstName pic")
    message = await message.populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "firstName pic email",
    })
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    })
    return res.json(message)
  } catch (err) {
    return res.status(400).json(err)
  }
}

const getAllMessages = async (req, res) => {
  const { chatId } = req.params
  try {
    const messages = await Messages.find({ chat: chatId })
      .populate("sender", "firstName pic email")
      .populate("chat")

    return res.status(200).json(messages)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ messsage: "Failed to get chat for the user" })
  }
}

module.exports = { sendMessage, getAllMessages }
