const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const io = require("socket.io")(8000, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

require("dotenv").config({ path: ".env" });
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use("/api/googleLogin", require("./routes/GoogleLogin"));
app.use(cookieParser());

mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Error in connecting to MongoDB...", err));

// chat socket
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
      users: getUsersInRoom(user.room),
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined!`,
      users: getUsersInRoom(user.room),
    });
    console.log("my name", name);

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log("userrrrrrrrr", user);

    io.to(user.room).emit("message", {
      user: user.name,
      text: message.message,
      users: getUsersInRoom(user.room),
    });
    console.log("message from server", message);
    socket.emit("message", message);
    callback();
  });

  socket.on("disconnect", () => {
    console.log("user disconnected- server", socket.id);
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} left!!!!`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }

    socket.emit("disconnectmsg");
  });
});

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Listening on port ${PORT}...`));
