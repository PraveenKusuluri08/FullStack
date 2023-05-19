const AWS = require("aws-sdk")
const Busboy = require("busboy")
const { v4: uuidv4 } = require("uuid")
const Sentry = require("@sentry/node")
const User = require("../models/userModel")
const io = require("socket.io")
const { clientSocketData } = require("./socket")
const s3 = new AWS.S3()

//these two functions are only useful for images upload

const imageUpload = (req, res) => {
  let chunks = [],
    fname,
    ftype,
    fEncoding
  let busboy = Busboy({ headers: req.headers })
  busboy.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    )
    if (
      mimeType !== "image/jpeg" &&
      mimeType !== "image/png" &&
      mimeType !== "jpg"
    ) {
      return res.status(404).json({
        message: "File type not accepted submit only 'png/jpeg/jpg'",
      })
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1]
    fname = `${Math.round(Math.random() * 1000000)}.${imageExtension}`
    ftype = mimeType
    fEncoding = encoding

    file.on("data", (data) => {
      console.log(data)
      chunks.push(data)
    })
    file.on("end", function () {
      console.log("File [" + filename + "] Finished")
    })
  })
  const userId = uuidv4()
  busboy.on("finish", () => {
    const params = {
      Bucket: "chat-app-mern",
      Key: `${userId}-${fname}`,
      Body: Buffer.concat(chunks),
      ACL: "public-read",
      ContentEncoding: fEncoding,
      ContentType: ftype,
    }
    s3.upload(params, (err, info) => {
      console.log(info)
      if (err) {
        return res.send({ err, error: true })
      } else {
        const id = req.user._id
        User.findByIdAndUpdate(
          { _id: id },
          { $set: { pic: info.Location } },
          (err, _) => {
            if (err) {
              Sentry.captureMessage(err.message)
              Sentry.captureException(err)
              return res.status(404).json({ message: "Failed to upload image" })
            }
            return res.status(202).send({
              data: info,
              message: "Image uploaded successfully",
            })
          }
        )
      }
    })
  })
  req.pipe(busboy)
}

const imageUploadExtractLink = (req, res) => {
  let chunks = [],
    fname,
    ftype,
    fEncoding
  let busboy = Busboy({ headers: req.headers })
  busboy.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info
    if (
      mimeType !== "image/jpeg" &&
      mimeType !== "image/png" &&
      mimeType !== "jpg"
    ) {
      return res.status(404).json({
        message: "File type not accepted submit only 'png/jpeg/jpg'",
      })
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1]
    fname = `${Math.round(Math.random() * 1000000)}.${imageExtension}`
    ftype = mimeType
    fEncoding = encoding

    file.on("data", (data) => {
      console.log("data", data)
      chunks.push(data)
    })
    file.on("end", function () {
      console.log("File [" + filename + "] Finished")
    })
  })
  const userId = uuidv4()
  busboy.on("finish", () => {
    const params = {
      Bucket: "chat-app-mern",
      Key: `${userId}-${fname}`,
      Body: Buffer.concat(chunks),
      ServerSideEncryption: "AES256",
      ACL: "public-read",
      ContentEncoding: fEncoding,
      ContentType: ftype,
    }
    s3.upload(params, (err, info) => {
      console.log(info)
      if (err) {
        return res.send({ err, error: true })
      } else {
        return res.send({
          data: info.Location,
          message: "Image uploaded successfully",
        })
      }
    })
  })
  req.pipe(busboy)
}

module.exports = { imageUpload, imageUploadExtractLink }
