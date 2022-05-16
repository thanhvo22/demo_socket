"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var roomSchema = new mongoose_1.Schema({
    roomName: { type: String },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account"
    }
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("Room", roomSchema);
