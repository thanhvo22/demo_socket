"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var db = require("./config/db.config");
var server = require("http").Server(app);
var io = require("socket.io")(server);
var cors = require("cors");
var auth_route_1 = require("./routes/auth.route");
var mess_route_1 = require("./routes/mess.route");
var user_route_1 = require("./routes/user.route");
var conversation_route_1 = require("./routes/conversation.route");
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
server.listen(3001, function () {
    console.log("listening on *:3001");
});
// io.on('connection', () =>{
//   console.log('a user is connected')
// })
app.use("/auth", auth_route_1["default"]);
app.use("/messages", mess_route_1["default"]);
app.use('/users', user_route_1["default"]);
app.use("/conversations", conversation_route_1["default"]);
