"use strict";
exports.__esModule = true;
// build server
var dotenv = require("dotenv");
dotenv.config();
var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var db = require("./config/db.config");
var server = require("http").Server(app);
var io = require("socket.io")(server);
var auth_route_1 = require("./routes/auth.route");
var mess_route_1 = require("./routes/mess.route");
var room_route_1 = require("./routes/room.route");
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser(process.env.SESSION_SECRET));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json()); //using signed \\ signedCookies
app.set("view engine", "ejs");
app.set("views", "./views");
db.connect();
// // create route, display view
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    console.log("co nguoi da ket noi", socket.id);
    // console.log(socket.adapter.rooms);
    socket.on('chat message', function (msg) {
        console.log("".concat(socket.id), msg);
        io.emit('chat message', msg);
    });
});
server.listen(3001, function () {
    console.log('listening on *:3001');
});
// app.get("/", function (req, res) {
//   res.render("layout");
// });
app.use("/auth", auth_route_1["default"]);
app.use("/rooms", room_route_1["default"]);
app.use("/message", mess_route_1["default"]);
