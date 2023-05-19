const router = require("express").Router()
const { body } = require("express-validator")
const {
  createChat,
  getChat,
  createGroupChat,
  appointAnotherPersonAsAdmin,
  renameTheGroup,
  addMembersToGroup,
  removeFromGroup,
  deleteGroup,
} = require("../Controller/chatController")
const endPoint = require("../middlewares/endpoint")

//TODO: get all chat for the user
router.get("/getchat", endPoint, getChat)

router.post("/createchat", endPoint, createChat)

//TODO:Create a group chat
router.post("/creategroupchat", endPoint, createGroupChat)

//TODO:Appoint another person as group admin
router.put(
  "/appointanotherpersonasgroupadmin",
  endPoint,
  appointAnotherPersonAsAdmin
)

//TODO:add members into the group
router.put("/addmemeberstogroup", endPoint, addMembersToGroup)

//TODO:Rename the group
router.put("/renamegroup", endPoint, renameTheGroup)

//TODO: Delete members from the group
router.put("/removememberfromgroup", endPoint, removeFromGroup)

//TODO:Delete group
router.delete("/deletegroup", endPoint, deleteGroup)

module.exports = router
