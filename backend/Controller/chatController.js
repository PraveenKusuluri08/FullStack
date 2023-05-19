const Chat = require("../models/chatModel")
const User = require("../models/userModel")
const router = require("../routes/chatRoutes")

const createChat = async (req, res) => {
  const { uid } = req.body
  console.log("req.user", req.user, uid)
  if (!uid) {
    console.log("User id is not exists")
    return res.sendStatus(400)
  }
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } }, //for getting the current loggedin user
      { users: { $elemMatch: { $eq: uid } } }, //responsible for receiving messages from current loggedin user
    ],
  })
    .populate("users", "-encry_password")
    .populate("latestMessage")

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "firstName email pic ",
  })

  if (isChat.length > 0) {
    //if chat exists gets all chat
    res.send(isChat[0])
  } else {
    //creatig a new chat here
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, uid],
    }
    try {
      const createChat = await Chat.create(chatData)
      const Fullchat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "-encry_password"
      )

      res.status(201).send(Fullchat)
    } catch (error) {
      console.log(error)
      return res.status(404).json({ error })
    }
  }
}

const getChat = (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-encry_password")
      .populate("groupAdmin", "-encry_password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (info) => {
        info = await User.populate(info, {
          path: "latestMessage.sender",
          select: "firstName email pic ",
        })
        res.status(200).send(info)
      })
  } catch (error) {
    res.status(404).json({ err })
  }
}

const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .status(400)
      .json({ message: "Are you really add members into group" })
  }
  const users = JSON.parse(req.body.users)
  console.log(typeof users)
  if (users.length < 2) {
    return res
      .status(404)
      .json({ message: "More than 2 members required to form a group" })
  }

  //TODO:if the bug of repeated in the users then resolve here
  users.push(req.user)
  const groupAdmin = [req.user]
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: groupAdmin,
    })
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-encry-password")
      .populate("groupAdmin", "-encry-password")

    return res.status(201).json(fullGroupChat)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ error })
  }
}

const appointAnotherPersonAsAdmin = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({
      message: "Are you really want to appoint person as group admin",
    })
  }
  const users = JSON.parse(req.body.users)
  let count = await Chat.count({ groupAdmin: { $in: [req.user._id] } })

  if (count < 0)
    return res
      .status(404)
      .json({ message: "You are not group admin to add users" })

  console.log(typeof users)
  try {
    console.log(req.body.users)

    const appointedUsers = await Chat.findOneAndUpdate(
      { chatName: req.body.name },
      { $addToSet: { groupAdmin: users } }
    )
    console.log("done")
    return res.status(201).json(appointedUsers)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ error: error })
  }
}

const renameTheGroup = async (req, res) => {
  const { chatId, chatName } = req.body

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-encry_password")
    .populate("groupAdmin", "-encry_password")

  return res.status(200).json(updatedChat)
}

const addMembersToGroup = async (req, res) => {
  const { chatId, userId } = req.body

  const addUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-encry_password")
    .populate("groupAdmin", "-encry_password")

  return res.status(200).send(addUser)
}

const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body
  console.log("userId", userId)
  const removeUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-encry_password")
    .populate("groupAdmin", "-encry_password")

  return res.status(200).send(removeUser)
}

const deleteGroup = async (req, res) => {
  const { groupId, confirm } = req.body
  let count = await Chat.count({ groupAdmin: { $in: [req.user._id] } })

  console.log("count", count)

  if (count === 0) {
    return res
      .status(404)
      .json({ message: "You are not group admin to delete the group" })
  }

  if (confirm === "yes") {
    await Chat.deleteOne({
      _id: groupId,
      $and: [
        { groupAdmin: { $in: [req.user._id] } },
        { isGroupChat: { $ne: false, $eq: true } },
      ],
    })
    return res.status(200).json({ message: "Group deleted successfully" })
  } else {
    return res
      .status(100)
      .json({ message: "Are you really want to delete the group" })
  }
}

module.exports = {
  createChat,
  getChat,
  createGroupChat,
  appointAnotherPersonAsAdmin,
  renameTheGroup,
  addMembersToGroup,
  removeFromGroup,
  deleteGroup,
}
