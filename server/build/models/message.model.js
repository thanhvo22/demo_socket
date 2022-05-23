"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var messageSchema = new mongoose_1.Schema({
    conversationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Conversation"
    },
    text: {
        type: String
    },
    sender: { type: String
    },
    createdAt: { type: Date, "default": Date.now() }
});
exports["default"] = (0, mongoose_1.model)("Message", messageSchema);
