"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var messageSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account"
    },
    text: {
        type: String,
        required: true
    },
    room_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Room"
    }
});
exports["default"] = (0, mongoose_1.model)("Message", messageSchema);
