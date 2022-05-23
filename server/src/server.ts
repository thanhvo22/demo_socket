import * as dotenv from "dotenv";
dotenv.config();
var express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const db = require("./config/db.config");
var server = require("http").Server(app);
var io = require("socket.io")(server);
const cors = require("cors");

import authRouter from "./routes/auth.route";
import messRouter from "./routes/mess.route";
import userRouter from "./routes/user.route";
import convRouter from "./routes/conversation.route";

app.use(express.json());
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

// app.get("/", (req: any, res: any) => {
//   // res.sendFile(__dirname + '/index.html');
//   // res.render("trangchu.ejs");
//   res.render("test.ejs");
// });

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

// io.on('connection', () =>{
//   console.log('a user is connected')
// })
app.use("/auth", authRouter);
app.use("/messages", messRouter);
app.use('/users', userRouter);
app.use("/conversations", convRouter);
