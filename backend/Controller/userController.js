const { validationResult } = require("express-validator")
const generateToken = require("../helpers/generateToken")
const User = require("../models/userModel")
const Sentry = require("@sentry/node")
var jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")

/**
 *
 * @description User sign up route
 * @route POST /api/users/signup
 * @access   Protected
 */
const signup = async (req, res) => {
  const { email, firstName, lastName, password, pic } = req.body

  const errors = validationResult(req)
  console.log(errors.array()[0])
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    })
  }

  const user = await User.create({ ...req.body })
  console.log(user)
  if (user) {
    res.status(201).json({
      message: "User created successfully",
      _id: user._id,
      email: user.email,
      fistName: user.firstName,
      lastName: user.lastName,
      pic: user.pic,
      token: generateToken(user._id),
    })
  } else {
    console.log(err)
    Sentry.captureEvent(err)
    return res.status(404).json({ error: "Failed to create user", err })
  }
}

const signin = async (req, res) => {
  const { email, password } = req.body
  console.log(email, " password:", password, JSON.stringify(req.body))
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg })
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not exists",
      })
    }
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      })
    }

    const token = generateToken(user._id)
    let date = new Date()
    res.cookie("token", token, { expire: date + 9999 })
    Sentry.captureMessage(err)
    //send response to front end
    const { _id, firstName, email, pic } = user
    return res.json({ token, user: { _id, firstName, email, pic } })
  })
}

const getAllUsers = async (req, res) => {
  const userData = req.query.name
    ? {
        $or: [
          { firstName: { $regex: req.query.name, $options: "i" } },
          { email: { $regex: req.query.name, $options: "i" } },
        ],
      }
    : {}
  const users = await User.find(userData).find({ _id: { $ne: req.user._id } })

  res.send(users)
}

const updateUserName = async (req, res) => {
  const userId = req.query._id
  const { userName } = req.body

  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg })
  }

  const user = User.findOneAndUpdate(
    { _id: userId },
    { firstName: userName, updatedAt: new Date().toISOString() }
  ).populate("-encry_password", "-createdAt", "-salt")
  console.log(user)
  if (user) {
    return res.status(200).json(user)
  } else {
    return res.status(400).json({ message: "Failed to update user" })
  }
}

module.exports = { signup, signin, getAllUsers, updateUserName }
