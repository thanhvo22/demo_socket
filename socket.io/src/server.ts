// build server
import * as dotenv from "dotenv";
dotenv.config();
var express = require("express");
var app = express();

const path = require("path");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const db = require("./config/db.config");
var server = require("http").Server(app);
var io = require("socket.io")(server);
const cors = require("cors");

import authRouter from "./routes/auth.route";
import messRouter from "./routes/mess.route";
import roomRouter from "./routes/room.route";
// import messController from "./controllers/mess.controller";

import accountModel from "./models/account.model";
import roomModel from "./models/room.model";
import messageModel from "./models/message.model";
import postCreateRoom from "./controllers/room.controller";

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

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
  // res.render("trangchu.ejs");
  res.render("test.ejs");
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

var mangChat = [];

// socket.adapter.rooms Show danh sach room dang co
// io.on("connection", function (socket) {
//   console.log("Co nguoi ket noi " + socket.id);

//   socket.on("tao-room", async function (data) {
//     socket.join(data);
//     //tao phong
//     socket.Phong = data;

//     // console.log(`socket.phong: ${socket.Phong}`);
//     console.log(`socket.id: ${socket.id}`);
//     var mang = [];
//     for (let r in socket.adapter.rooms) {
//       mang.push(r);
//     }
//     io.sockets.emit("server-send-rooms", mang);
//     socket.emit("server-send-room-socket", data);
//   });

//   socket.on("user-chat", async function (data) {
//     console.log(`data: ${data}`);
//     console.log(`socket: ${socket.Phong}`);
//     let room_id = socket.Phong;
//     // await messageModel.create({ text: data });
//     io.sockets.in(socket.Phong).emit("server-chat", `${socket.id}: ${data}`);
//   });
// });

io.on('connection', () =>{
  console.log('a user is connected')
})
app.use("/auth", authRouter);
app.use("/rooms", roomRouter);
app.use("/messages", messRouter);
