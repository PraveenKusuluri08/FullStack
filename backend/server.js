const express = require("express")

const app = express()
const cors = require("cors")
const chats = require("./data/data")
const DbConnection = require("./Config/db")
const colors = require("colors")
const userRoutes = require("./routes/userRoutes")
const { pageNotFound, errorHandle } = require("./middlewares/pagenotfound")
const Sentry = require("@sentry/node")
const Tracing = require("@sentry/tracing")
const AWS = require("aws-sdk")
const chatRoutes = require("./routes/chatRoutes")
const http = require("http").Server(app)
const { createServer } = require("http")
const { Server } = require("socket.io")
const path = require("path")

require("dotenv").config()

const httpServer = createServer(app)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "Frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "..", "Frontend", "build", "index.html"))
  )
} else {
  app.get("/", (req, res) => {
    res.send("API is running..")
  })
}

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
})

io.on("connection", (socket) => {
  console.log("Socket is connected to client")

  socket.on("setup", (userData) => {
    socket.join(userData._id)
    console.log(userData._id)
    socket.emit("connected")
  })

  socket.on("join chat", (room) => {
    socket.join(room)
    console.log("User joined to room " + room)
  })

  socket.on("typing", (room) => socket.in(room).emit("typing"))
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

  socket.on("new message", (newMessage) => {
    let chat = newMessage.chat

    if (!chat) return console.log("chat users in defined")

    chat.users.forEach((user) => {
      if (user._id === newMessage.sender._id) return

      socket.in(user._id).emit("message recieved", newMessage)
    })
  })

  socket.off("setup", () => {
    console.log("User disconnected")
    socket.leave(userData._id)
  })
})

AWS.config.update({
  apiVersion: "2010-12-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
})

app.use(cors({ origin: true }))

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    new Tracing.Integrations.Express({
      app,
    }),
  ],
})

app.use(Sentry.Handlers.requestHandler())
app.use(express.json())
DbConnection()

app.use("/api/users", userRoutes)

app.use("/api/chat", chatRoutes)

app.use("/api/messages", require("./routes/messageRoutes"))

app.use("/api/notification", require("./routes/notificationRoutes"))

app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      if (error.status === 404 || error.status === 500) {
        return true
      } else {
        return false
      }
    },
  })
)

app.use(pageNotFound)
app.use(errorHandle)

const PORT = process.env.PORT_ADDRESS || 8080

httpServer.listen(PORT, () => {
  console.log(`App is listening to the port ${PORT}`.underline.blue.bold)
})
