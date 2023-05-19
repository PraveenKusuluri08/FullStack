const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const endPoint = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decodedToken)
      req.user = await User.findById(decodedToken.id).select("-password")

      next()
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: "Not authorized try again" })
    }
  } else {
    return res.status(403).json({ error: `UnAuthorised` })
  }
}

module.exports = endPoint
