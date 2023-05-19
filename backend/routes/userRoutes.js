const router = require("express").Router()
const { body, validationResult, check } = require("express-validator")
const {
  signup,
  signin,
  getAllUsers,
  updateUserName,
} = require("../Controller/userController")
const { imageUpload, imageUploadExtractLink } = require("../helpers/fileUpload")
const endPoint = require("../middlewares/endpoint")
const User = require("../models/userModel")
router.post(
  "/signup",
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is not in the correct form")
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use")
        }
      })
    }),
  body("password")
    .isLength({ min: 6, max: 100 })
    .withMessage("Password must be 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])/)
    .withMessage(
      "password between 6 to 20 characters which contain at least one numeric digit, one uppercase, and one lowercase letter"
    ),
  body("firstName")
    .not()
    .isEmpty()
    .trim()
    .withMessage("please give the user name"),
  signup
)

router.post(
  "/signin",
  body("email")
    .isEmail()
    .withMessage("Email is no in the correct form")
    .trim()
    .normalizeEmail(),
  signin
)

router.post("/profilePicChange", endPoint, imageUpload)

//for the signup page frontend popup
router.post("/imageUpload", imageUploadExtractLink)

router.get("/getallusers", endPoint, getAllUsers)

router.put(
  "/updateusername",
  body("userName").isLength().withMessage("Are you want to update user name"),
  endPoint,
  updateUserName
)
module.exports = router
