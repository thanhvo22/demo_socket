// build server
import * as dotenv from "dotenv";
dotenv.config();
var express = require("express");
var app = express();

const path = require('path');
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const db = require("./config/db.config");
var server = require("http").Server(app);
var io = require("socket.io")(server);
const cors = require("cors");

import authRouter from "./routes/auth.route";
import messRouter from "./routes/mess.route";
import roomRouter from "./routes/room.route";

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(cors());

// parse application/json
app.use(bodyParser.json()); //using signed \\ signedCookies
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");
db.connect();

app.get("/", (req: any, res: any) => {
  // res.sendFile(__dirname + '/index.html');
  res.render("trangchu.ejs");
});

// io.on('connection', (socket) => {
//   console.log("co nguoi da ket noi", socket.id);
//   // console.log(socket.adapter.rooms);
//   socket.on('chat message', msg => {
//     console.log(`${socket.id}`, msg)
//     io.emit('chat message', msg);
//   });
// });
server.listen(3001, () => {
  console.log("listening on *:3001");
});

// io.on('connect', (socket) => {
//   socket.on('join', ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });
//     console.log(`user ${user}`)
//     if(error) return callback(error);

//     socket.join(user.room);

//     socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
//     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

//     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//     callback();
//   });

//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);

//     io.to(user.room).emit('message', { user: user.name, text: message });

//     callback();
//   });

//   socket.on('disconnect', () => {
//     const user = removeUser(socket.id);

//     if(user) {
//       io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
//     }
//   })
// });
var mangChat = [];

// socket.adapter.rooms Show danh sach room dang co
io.on("connection", function (socket) {
  console.log("Co nguoi ket noi " + socket.id);

  socket.on("tao-room", function (data) {
    socket.join(data);
    //tao phong
    socket.Phong = data;

    var mang = [];
    for (let r in socket.adapter.rooms) {
      mang.push(r);
    }
    io.sockets.emit("server-send-rooms", mang);
    socket.emit("server-send-room-socket", data);
  });

  socket.on("user-chat", function (data) {
    io.sockets.in(socket.Phong).emit("server-chat", data);
  });
});

app.use("/auth", authRouter);
app.use("/rooms", roomRouter);
app.use("/messages", messRouter);
